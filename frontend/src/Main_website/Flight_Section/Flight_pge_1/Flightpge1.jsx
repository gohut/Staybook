import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import TopNavbar from "../../Top_Navbar/TopNavbar";
import FlightsSearchBar from "./Search_bar/FlightsSearchBar";
import FlightsFiltersAndHeader from "./FilterAndHeader/FlightsFiltersAndHeader";
import FlightsFiltersSidebar from "./FilterSidebar/FlightsFiltersSidebar";
import FlightsTimeAirlinesFilters from "./TimesAirlineFilter/FlightsTimeAirlinesFilters";
import FlightsResultsList from "./ResultList/FlightsResultsList";

import {
  AIRPORTS,
  TRIP_OPTIONS,
  FARE_OPTIONS,
  TRAVEL_CLASSES,
  POPULAR_FILTERS,
  STOP_FILTERS,
  SORT_MODES,
  TIME_BLOCKS,
  applyFlightFilters,
  buildFlightsForSearch,
  buildInitialSearchState,
  createInitialFilters,
  formatPrice,
  getAirportByCode,
  getAppliedFilterPills,
  getDateStrip,
  getFilterMeta,
  getSortSummary,
  normalizeSearchState,
  sanitizeFiltersForMeta,
} from "./flightSearchData";

import "./Flightpge1.scss";

const STOP_IDS = new Set(["nonstop", "1stop"]);

const toggleInSet = (sourceSet, id) => {
  const nextSet = new Set(sourceSet);
  if (nextSet.has(id)) {
    nextSet.delete(id);
  } else {
    nextSet.add(id);
  }
  return nextSet;
};

const getMinPriceByStop = (flights, stopKey) => {
  const selected = flights
    .filter((flight) => flight.stopKey === stopKey)
    .sort((a, b) => a.priceValue - b.priceValue);
  return selected[0]?.priceValue || 0;
};

export default function Flightpge1() {
  const location = useLocation();
  const initialSearch = useMemo(
    () => buildInitialSearchState(location.state),
    [location.state]
  );

  const [searchDraft, setSearchDraft] = useState(initialSearch);
  const [appliedSearch, setAppliedSearch] = useState(initialSearch);
  const [filters, setFilters] = useState(createInitialFilters);

  useEffect(() => {
    const next = buildInitialSearchState(location.state);
    setSearchDraft(next);
    setAppliedSearch(next);
    setFilters(createInitialFilters());
  }, [location.state]);

  const routeFlights = useMemo(
    () => buildFlightsForSearch(appliedSearch),
    [appliedSearch]
  );

  const filterMeta = useMemo(() => getFilterMeta(routeFlights), [routeFlights]);

  useEffect(() => {
    setFilters((prev) => sanitizeFiltersForMeta(prev, filterMeta));
  }, [filterMeta]);

  const filteredFlights = useMemo(
    () => applyFlightFilters(routeFlights, filters, appliedSearch),
    [routeFlights, filters, appliedSearch]
  );

  const fromAirport = useMemo(
    () => getAirportByCode(appliedSearch.fromCode),
    [appliedSearch.fromCode]
  );
  const toAirport = useMemo(
    () => getAirportByCode(appliedSearch.toCode),
    [appliedSearch.toCode]
  );

  const headingTitle = `Flights from ${fromAirport.city} to ${toAirport.city}`;
  const quickDates = useMemo(() => getDateStrip(appliedSearch), [appliedSearch]);

  const popularFilters = useMemo(
    () =>
      POPULAR_FILTERS.map((filterItem) => ({
        ...filterItem,
        priceLabel:
          filterItem.id === "nonstop"
            ? formatPrice(getMinPriceByStop(routeFlights, "nonstop"))
            : filterItem.id === "1stop"
              ? formatPrice(getMinPriceByStop(routeFlights, "1stop"))
              : formatPrice(filterMeta.minPrice || 0),
      })),
    [routeFlights, filterMeta.minPrice]
  );

  const stopFilters = useMemo(
    () =>
      STOP_FILTERS.map((filterItem) => ({
        ...filterItem,
        priceLabel: formatPrice(getMinPriceByStop(routeFlights, filterItem.id)),
      })),
    [routeFlights]
  );

  const sortSummaries = useMemo(
    () =>
      SORT_MODES.reduce((acc, sortMode) => {
        acc[sortMode.id] = getSortSummary(filteredFlights, sortMode.id);
        return acc;
      }, {}),
    [filteredFlights]
  );

  const updateSearchDraft = (patch) => {
    setSearchDraft((prev) => normalizeSearchState({ ...prev, ...patch }));
  };

  const runSearch = () => {
    const normalized = normalizeSearchState(searchDraft);
    setSearchDraft(normalized);
    setAppliedSearch(normalized);
  };

  const handleSwapAirports = () => {
    updateSearchDraft({
      fromCode: searchDraft.toCode,
      toCode: searchDraft.fromCode,
    });
  };

  const handleQuickDateChange = (dateValue) => {
    setSearchDraft((prev) => {
      const next = normalizeSearchState({ ...prev, departureDate: dateValue });
      setAppliedSearch(next);
      return next;
    });
  };

  const togglePopularFilter = (id) => {
    setFilters((prev) => {
      const popular = toggleInSet(prev.popular, id);
      const next = { ...prev, popular };
      if (STOP_IDS.has(id)) {
        next.stops = toggleInSet(prev.stops, id);
      }
      return next;
    });
  };

  const toggleStopFilter = (id) => {
    setFilters((prev) => {
      const stops = toggleInSet(prev.stops, id);
      const popular = new Set(prev.popular);
      if (stops.has(id)) {
        popular.add(id);
      } else {
        popular.delete(id);
      }
      return { ...prev, stops, popular };
    });
  };

  const toggleSetFilter = (key, id) => {
    setFilters((prev) => ({
      ...prev,
      [key]: toggleInSet(prev[key], id),
    }));
  };

  const clearAllFilters = () => {
    setFilters((prev) => ({
      ...createInitialFilters(),
      sortMode: prev.sortMode,
    }));
  };

  const appliedPills = getAppliedFilterPills(filters);
  const priceRange = {
    min: filterMeta.minPrice || 0,
    max: filterMeta.maxPrice || filterMeta.minPrice || 0,
    selectedMax:
      typeof filters.maxPrice === "number"
        ? filters.maxPrice
        : filterMeta.maxPrice || filterMeta.minPrice || 0,
  };

  return (
    <>
      <div className="fp1-topnav-fixed">
        <TopNavbar />
      </div>

      <div className="fp1-content">
        <FlightsSearchBar
          airports={AIRPORTS}
          tripOptions={TRIP_OPTIONS}
          fareOptions={FARE_OPTIONS}
          travelClasses={TRAVEL_CLASSES}
          values={searchDraft}
          onChange={updateSearchDraft}
          onSwap={handleSwapAirports}
          onSearch={runSearch}
        />

        <FlightsFiltersAndHeader
          title={headingTitle}
          fromCity={fromAirport.city}
          toCity={toAirport.city}
          flightsCount={filteredFlights.length}
          popularFilters={popularFilters}
          selectedPopular={filters.popular}
          appliedPills={appliedPills}
          onTogglePopular={togglePopularFilter}
          onRemovePopular={(id) =>
            setFilters((prev) => ({
              ...prev,
              popular: new Set([...prev.popular].filter((entry) => entry !== id)),
              stops: STOP_IDS.has(id)
                ? new Set([...prev.stops].filter((entry) => entry !== id))
                : prev.stops,
            }))
          }
          onClearPopular={clearAllFilters}
          quickDates={quickDates}
          activeDate={appliedSearch.departureDate}
          onDateChange={handleQuickDateChange}
          sortModes={SORT_MODES}
          activeSortMode={filters.sortMode}
          sortSummaries={sortSummaries}
          onSortChange={(mode) => setFilters((prev) => ({ ...prev, sortMode: mode }))}
        />

        <section className="fp1-grid">
          <div className="fp1-left">
            <FlightsFiltersSidebar
              fromCity={fromAirport.city}
              departureAirports={filterMeta.departureAirports}
              selectedDepartureAirports={filters.departureAirports}
              onToggleDepartureAirport={(id) => toggleSetFilter("departureAirports", id)}
              priceRange={priceRange}
              onPriceChange={(value) =>
                setFilters((prev) => ({ ...prev, maxPrice: Number(value) }))
              }
              stopFilters={stopFilters}
              selectedStops={filters.stops}
              onToggleStop={toggleStopFilter}
            />

            <FlightsTimeAirlinesFilters
              fromCity={fromAirport.city}
              toCity={toAirport.city}
              timeBlocks={TIME_BLOCKS}
              selectedDepTime={filters.depTime}
              selectedArrTime={filters.arrTime}
              onToggleDepTime={(id) => toggleSetFilter("depTime", id)}
              onToggleArrTime={(id) => toggleSetFilter("arrTime", id)}
              airlines={filterMeta.airlines}
              selectedAirlines={filters.airlines}
              onToggleAirline={(id) => toggleSetFilter("airlines", id)}
              aircraft={filterMeta.aircraft}
              selectedAircraft={filters.aircraft}
              onToggleAircraft={(id) => toggleSetFilter("aircraft", id)}
            />
          </div>

          <div className="fp1-right">
            <FlightsResultsList flights={filteredFlights} />
          </div>
        </section>
      </div>
    </>
  );
}

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Lead } from "@/lib/types/lead";

export interface LeadsState {
  leads: Lead[];
  filteredLeads: Lead[];
  searchTerm: string;
  statusFilter: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: LeadsState = {
  leads: [],
  filteredLeads: [],
  searchTerm: "",
  statusFilter: "",
  currentPage: 1,
  itemsPerPage: 5,
};

function applyFilters(state: LeadsState) {
  let result = [...state.leads];
  if (state.searchTerm) {
    const searchLower = state.searchTerm.toLowerCase();
    result = result.filter(
      (lead) =>
        lead.first_name.toLowerCase().includes(searchLower) ||
        lead.last_name.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.country.toLowerCase().includes(searchLower)
    );
  }

  if (state.statusFilter) {
    result = result.filter((lead) => lead.status === state.statusFilter);
  }
  state.filteredLeads = result;
}

export const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setInitialLeads: (state, action: PayloadAction<Lead[]>) => {
      state.leads = action.payload;
      state.filteredLeads = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.statusFilter = action.payload;
      state.currentPage = 1;
      applyFilters(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.searchTerm = "";
      state.statusFilter = "";
      state.currentPage = 1;
      state.filteredLeads = state.leads;
    },
  },
});

export const {
  setInitialLeads,
  setSearch,
  setStatus,
  setCurrentPage,
  resetFilters,
} = leadsSlice.actions;

export const selectCount = (state: RootState) => state.leads;

export default leadsSlice.reducer;


import React, { useEffect } from "react";
import { Lead } from "@/lib/types/lead";

import styles from "../../_styles/leadsTable.module.css";
import { BsArrowDown } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setCurrentPage,
  setInitialLeads,
  setSearch,
  setStatus,
} from "@/lib/store/slices/leadsSlice";

interface Props {
  leads: Lead[];
}

export const LeadsTableClient = ({ leads }: Props) => {
  const dispatch = useAppDispatch();
  const { filteredLeads, searchTerm, statusFilter, currentPage, itemsPerPage } =
    useAppSelector((state) => state.leads);
  const totalItems = filteredLeads.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredLeads.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    dispatch(setInitialLeads(leads));
  }, [leads, dispatch]);
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.controls}>
          <input
            type="text"
            placeholder="Search leads..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => dispatch(setSearch(e.target.value))}
          />
          <select
            className={styles.statusFilter}
            value={statusFilter}
            onChange={(e) => dispatch(setStatus(e.target.value))}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="REACHED OUT">Reached Out</option>
          </select>
        </div>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.tableHeadCell}>
                <div>
                  <span>Name</span>
                  <BsArrowDown />
                </div>
              </th>
              <th className={styles.tableHeadCell}>
                <div>
                  <span>Email</span>
                  <BsArrowDown />
                </div>
              </th>
              <th className={styles.tableHeadCell}>
                <div>
                  <span>Country</span>
                  <BsArrowDown />
                </div>
              </th>
              <th className={styles.tableHeadCell}>
                <div>
                  <span>Status</span>
                  <BsArrowDown />
                </div>
              </th>
              <th className={styles.tableHeadCell}>
                <div>
                  <span>Created</span>
                  <BsArrowDown />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  Wow! So Empty
                </td>
              </tr>
            ) : (
              currentItems.map((lead) => (
                <tr key={lead.id} className={styles.tableBodyRow}>
                  <td className={styles.tableBodyRowCell}>
                    {lead.first_name} {lead.last_name}
                  </td>
                  <td className={styles.tableBodyRowCell}>{lead.email}</td>
                  <td className={styles.tableBodyRowCell}>{lead.country}</td>
                  <td className={styles.tableBodyRowCell}>
                    <span>{lead.status}</span>
                  </td>
                  <td className={styles.tableBodyRowCell}>
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className={styles.footer}>
            <tr>
              <th colSpan={4}></th>
              <th className={styles.pagination}>
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    <div className={styles.pageButtons}>
                      <button
                        className={`${styles.pageButton} ${styles.pageButtonControl}`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className={`${styles.pageButton} ${
                              currentPage === page
                                ? styles.activePageButton
                                : ""
                            }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        className={`${styles.pageButton} ${styles.pageButtonControl}`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                )}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};


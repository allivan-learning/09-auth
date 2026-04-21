"use client";

import React from "react";
import css from "./Pagination.module.css";

interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Pagination({
  current,
  total,
  onChange,
}: PaginationProps) {
  return (
    <div className={css.pagination}>
      <button
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        className={css.btn}
      >
        Prev
      </button>

      <span className={css.info}>
        Page {current} of {total}
      </span>

      <button
        disabled={current >= total}
        onClick={() => onChange(current + 1)}
        className={css.btn}
      >
        Next
      </button>
    </div>
  );
}

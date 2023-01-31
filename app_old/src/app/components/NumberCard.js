/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { Statistic } from 'antd';

export function NumberCard({
  className,
  iconColor = "success",
  widgetHeight = "185px",
  value,
  title,
  suffix
}) {
  return (
    <>
      <div
        className={`card card-custom ${className}`}
        style={{ minHeight: widgetHeight }}
      >
        <div className="card-body">
          <span className={`svg-icon svg-icon-3x svg-icon-${iconColor}`}>
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Group.svg")}
            />
          </span>
          <div className="text-dark font-weight-bolder font-size-h2 mt-3">
            <Statistic
              value={value}
              groupSeparator="."
            />
          </div>
          <div
            className="text-hover-primary font-size-sm mt-1"
          >
            {suffix}
          </div>
          <div
            className="text-muted text-hover-primary font-weight-bold font-size-lg mt-1"
          >
            {title}
          </div>
        </div>
      </div>
    </>
  );
}

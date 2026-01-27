// // import type { Theme } from "@src/types/theme";

// // const ChartStyle = ({ theme }: { theme: Theme }) => {
// //   return (
// //     <style>{`
// //       .custom-chart-container {
// //         background: transparent !important;
// //         border: 1px solid ${theme.row.borderColor} !important;
// //         border-radius: 20px !important;
// //         padding: 24px !important;
// //         box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
// //         transition: all 0.2s ease !important;
// //         backdrop-filter: blur(10px) !important;
// //         margin-bottom: 24px !important;
// //       }
      
// //       .custom-chart-container h3 {
// //         color: ${theme.title.color} !important;
// //         font-size: 18px !important;
// //         font-weight: 600 !important;
// //         margin-bottom: 16px !important;
// //         letter-spacing: 0.02em !important;
// //       }
      
// //       .custom-chart-container .chartjs-canvas {
// //         border-radius: 12px !important;
// //         background: transparent !important;
// //       }
      
// //       .custom-chart-container .ant-spin {
// //         color: ${theme.employee.nameColor} !important;
// //       }
      
// //       .custom-chart-container .ant-spin-dot-item {
// //         background-color: ${theme.button.background} !important;
// //       }
      
// //       .custom-chart-container .ant-alert {
// //         background: transparent !important;
// //         border: 1px solid ${theme.row.borderColor} !important;
// //         color: ${theme.employee.nameColor} !important;
// //       }
      
// //       .custom-chart-container .ant-alert-message {
// //         color: ${theme.employee.nameColor} !important;
// //         font-weight: 500 !important;
// //       }
      
// //       .custom-chart-container .ant-alert-icon {
// //         color: ${theme.modal?.iconColor || theme.button.background} !important;
// //       }
      
// //       /* Hover effect for container */
// //       .custom-chart-container:hover {
// //         box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
// //       }
      
// //       /* Empty state */
// //       .custom-chart-container .no-data {
// //         color: ${theme.employee.nameColor} !important;
// //         font-size: 14px !important;
// //         text-align: center !important;
// //         padding: 16px !important;
// //       }
// //     `}</style>
// //   );
// // };

// // export default ChartStyle;


// import type { Theme } from "@src/types/theme";

// const ChartStyle = ({ theme }: { theme: Theme }) => {
//   return (
//     <style>{`
//       .custom-chart-container {
//         background: transparent !important;
//         border: 1px solid ${theme.row.borderColor} !important;
//         border-radius: 20px !important;
//         padding: 24px !important;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
//         transition: all 0.2s ease !important;
//         backdrop-filter: blur(10px) !important;
//         margin-bottom: 24px !important;
//       }
      
//       .custom-chart-container h3 {
//         color: ${theme.title.color} !important;
//         font-size: 18px !important;
//         font-weight: 600 !important;
//         margin-bottom: 16px !important;
//         letter-spacing: 0.02em !important;
//       }
      
//       .custom-chart-container .g2-plot-container {
//         border-radius: 12px !important;
//         background: transparent !important;
//       }
      
//       .custom-chart-container .ant-spin {
//         color: ${theme.employee.nameColor} !important;
//       }
      
//       .custom-chart-container .ant-spin-dot-item {
//         background-color: ${theme.button.background} !important;
//       }
      
//       .custom-chart-container .ant-alert {
//         background: transparent !important;
//         border: 1px solid ${theme.row.borderColor} !important;
//         color: ${theme.employee.nameColor} !important;
//       }
      
//       .custom-chart-container .ant-alert-message {
//         color: ${theme.employee.nameColor} !important;
//         font-weight: 500 !important;
//       }
      
//       .custom-chart-container .ant-alert-icon {
//         color: ${theme.modal?.iconColor || theme.button.background} !important;
//       }
      
//       /* Hover effect for container */
//       .custom-chart-container:hover {
//         box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
//       }
      
//       /* Empty state */
//       .custom-chart-container .no-data {
//         color: ${theme.employee.nameColor} !important;
//         font-size: 14px !important;
//         text-align: center !important;
//         padding: 16px !important;
//       }
      
//       /* Ant Design Plots specific styles */
//       .custom-chart-container .g2-legend {
//         color: ${theme.title.color} !important;
//       }
      
//       .custom-chart-container .g2-tooltip {
//         background: ${theme.modal?.background} !important;
//         color: ${theme.modal?.color} !important;
//         border: 1px solid ${theme.row.borderColor} !important;
//         border-radius: 8px !important;
//         box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important;
//         padding: 8px 12px !important;
//       }
      
//       .custom-chart-container .g2-tooltip-title {
//         color: ${theme.title.color} !important;
//         font-weight: 600 !important;
//         margin-bottom: 4px !important;
//       }
      
//       .custom-chart-container .g2-tooltip-list-item {
//         color: ${theme.employee.nameColor} !important;
//         font-size: 12px !important;
//       }
      
//       .custom-chart-container .g2-label {
//         color: ${theme.employee.nameColor} !important;
//         font-size: 12px !important;
//       }
      
//       .custom-chart-container .g2-axis-label {
//         color: ${theme.employee.nameColor} !important;
//         font-size: 12px !important;
//       }
      
//       .custom-chart-container .g2-axis-title {
//         color: ${theme.title.color} !important;
//         font-weight: 500 !important;
//       }
      
//       .custom-chart-container .g2-grid-line {
//         stroke: ${theme.row.borderColor} !important;
//         opacity: 0.5 !important;
//       }
      
//       /* Bar/Column specific */
//       .custom-chart-container .g2-bar-element {
//         transition: fill 0.2s ease !important;
//       }
      
//       .custom-chart-container .g2-bar-element:hover {
//         fill-opacity: 0.8 !important;
//       }
      
//       /* Line specific */
//       .custom-chart-container .g2-line {
//         stroke-width: 2px !important;
//         transition: stroke 0.2s ease !important;
//       }
      
//       .custom-chart-container .g2-line-point {
//         transition: fill 0.2s ease, stroke 0.2s ease !important;
//       }
      
//       .custom-chart-container .g2-line-point:hover {
//         r: 6 !important;
//         stroke-width: 2 !important;
//       }
      
//       /* Pie specific */
//       .custom-chart-container .g2-pie-label {
//         fill: ${theme.employee.nameColor} !important;
//         font-size: 12px !important;
//       }
      
//       .custom-chart-container .g2-pie-outer-label {
//         fill: ${theme.title.color} !important;
//         font-weight: 500 !important;
//       }
      
//       /* Animation */
//       .custom-chart-container .g2-animation {
//         animation-duration: 0.5s !important;
//         animation-timing-function: ease-in-out !important;
//       }
//     `}</style>
//   );
// };

// export default ChartStyle;

import type { Theme } from "@src/types/theme";

const ChartStyle = ({ theme }: { theme: Theme }) => {
  return (
    <style>{`
      .custom-chart-container {
        background: transparent !important;
        border: 1px solid ${theme.row.borderColor} !important;
        border-radius: 20px !important;
        padding: 24px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
        transition: all 0.2s ease !important;
        backdrop-filter: blur(10px) !important;
        margin-bottom: 24px !important;
      }
      
      /* Titles */
      .custom-chart-container h3 {
        color: ${theme.title.color} !important;
      }

      /* FORCE legend & all chart text to use theme color in dark mode.
         Targets SVG <text>, <tspan>, G2 legend HTML/text elements and tooltips.
      */



      .custom-chart-container h3 {
        color: ${theme.title.color} !important;
        font-size: 18px !important;
        font-weight: 600 !important;
        margin-bottom: 16px !important;
        letter-spacing: 0.02em !important;
      }

      .custom-chart-container .g2-plot-container {
        border-radius: 12px !important;
        background: transparent !important;
      }

      /* Generic chart text/labels/legend/tooltips - ensure visibility in dark mode */
      .custom-chart-container svg text,
      .custom-chart-container svg tspan,
      .custom-chart-container .g2-legend,
      .custom-chart-container .g2-legend * ,
      .custom-chart-container .g2-legend-list .g2-legend-item,
      .custom-chart-container .g2-legend-list .g2-legend-item text,
      .custom-chart-container .g2-legend-list .g2-legend-item tspan,
      .custom-chart-container .g2-legend-item-text,
      .custom-chart-container .g2-legend-item-value,
      .custom-chart-container .g2-label,
      .custom-chart-container .g2-axis-label,
      .custom-chart-container .g2-axis-title,
      .custom-chart-container .g2-tooltip,
      .custom-chart-container .g2-tooltip * {
        fill: ${theme.title.color} !important;
        color: ${theme.title.color} !important;
        stroke: ${theme.title.color} !important;
        opacity: 1 !important;
      }

      /* Extra in case legend uses CSS color on spans */
      .custom-chart-container .g2-legend-item-text,
      .custom-chart-container .g2-legend-item-value,
      .custom-chart-container .g2-legend .legend-item,
      .custom-chart-container .g2-legend .legend-item span {
        color: ${theme.title.color} !important;
        opacity: 1 !important;
      }

      /* tooltip styling */
      .custom-chart-container .g2-tooltip {
        background: ${theme.modal?.background} !important;
        color: ${theme.modal?.color} !important;
        border: 1px solid ${theme.row.borderColor} !important;
      }

      .custom-chart-container .ant-spin {
        color: ${theme.employee.nameColor} !important;
      }
      
      .custom-chart-container .ant-spin-dot-item {
        background-color: ${theme.button.background} !important;
      }
      
      .custom-chart-container .ant-alert {
        background: transparent !important;
        border: 1px solid ${theme.row.borderColor} !important;
        color: ${theme.employee.nameColor} !important;
      }
      
      .custom-chart-container .ant-alert-message {
        color: ${theme.employee.nameColor} !important;
        font-weight: 500 !important;
      }
      
      .custom-chart-container .ant-alert-icon {
        color: ${theme.modal?.iconColor || theme.button.background} !important;
      }
      
      /* Hover effect for container */
      .custom-chart-container:hover {
        box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
      }
      
      /* Empty state */
      .custom-chart-container .no-data {
        color: ${theme.employee.nameColor} !important;
        font-size: 14px !important;
        text-align: center !important;
        padding: 16px !important;
      }
      
      /* Ant Design Plots specific styles */
      .custom-chart-container .g2-legend {
        color: ${theme.title.color} !important;
      }
      
      .custom-chart-container .g2-tooltip {
        background: ${theme.modal?.background} !important;
        color: ${theme.modal?.color} !important;
        border: 1px solid ${theme.row.borderColor} !important;
        border-radius: 8px !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12) !important;
        padding: 8px 12px !important;
      }
      
      .custom-chart-container .g2-tooltip-title {
        color: ${theme.title.color} !important;
        font-weight: 600 !important;
        margin-bottom: 4px !important;
      }
      
      .custom-chart-container .g2-tooltip-list-item {
        color: ${theme.employee.nameColor} !important;
        font-size: 12px !important;
      }
      
      .custom-chart-container .g2-label {
        color: ${theme.employee.nameColor} !important;
        font-size: 12px !important;
      }
      
      .custom-chart-container .g2-axis-label {
        color: ${theme.employee.nameColor} !important;
        font-size: 12px !important;
      }
      
      .custom-chart-container .g2-axis-title {
        color: ${theme.title.color} !important;
        font-weight: 500 !important;
      }
      
      .custom-chart-container .g2-grid-line {
        stroke: ${theme.row.borderColor} !important;
        opacity: 0.5 !important;
      }
      
      /* Bar/Column specific */
      .custom-chart-container .g2-bar-element {
        transition: fill 0.2s ease !important;
      }
      
      .custom-chart-container .g2-bar-element:hover {
        fill-opacity: 0.8 !important;
      }
      
      /* Line specific */
      .custom-chart-container .g2-line {
        stroke-width: 2px !important;
        transition: stroke 0.2s ease !important;
      }
      
      .custom-chart-container .g2-line-point {
        transition: fill 0.2s ease, stroke 0.2s ease !important;
      }
      
      .custom-chart-container .g2-line-point:hover {
        r: 6 !important;
        stroke-width: 2 !important;
      }
      
      /* Pie specific */
      .custom-chart-container .g2-pie-label {
        fill: ${theme.employee.nameColor} !important;
        font-size: 12px !important;
      }
      
      .custom-chart-container .g2-pie-outer-label {
        fill: ${theme.title.color} !important;
        font-weight: 500 !important;
      }
      
      /* Animation */
      .custom-chart-container .g2-animation {
        animation-duration: 0.5s !important;
        animation-timing-function: ease-in-out !important;
      }
    `}</style>
  );
};

export default ChartStyle;
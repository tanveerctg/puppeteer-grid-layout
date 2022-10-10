const puppeteer = require("puppeteer");
const fs = require("fs");

const express = require("express");
const app = express();

app.get("/", async function (req, res) {
  // Create a browser instance
  // const browser = await puppeteer.launch();
  //after
  const browser = await puppeteer.launch({
    args: ["--font-render-hinting=none"],
  });

  // Create a new page
  const page = await browser.newPage();

  const compileTailwind = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>React CDN</title>
      <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script src="https://cdn.tailwindcss.com"></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/react-grid-layout/1.3.4/react-grid-layout.min.js"
        integrity="sha512-/7wCpnqvvQ/4dOrv3M6UK2o4i43UO78xenjzey7fQiCM3OyFLqt4tdXMUkX4H1hO51Te/1AzvTu+Zj7KsCJ7jA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      ></script>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/react-grid-layout/1.3.4/css/styles.min.css"
        integrity="sha512-uH29SLoNgqvc1edb0k7SKi4vJqXGqplQVbCroOnPsRJ/dep73NA+FYiKXBpPx15NCvETG/rpJlfRoklMc2V3YQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
      media @print {
        body: {
          font-size: "16px";
 
        }
      
        .no-break-inside {
          // apply this class to every component that shouldn't be cut off between to pages of your PDF
          break-inside: "avoid";
        }
      
        .break-before {
          // apply this class to every component that should always display on next page
          break-before: "always";
        }
      }
      /* React Grid Layout */

      .react-grid-layout {
        position: relative;
        transition: height 200ms ease;
      }
      .react-grid-item {
        transition: all 200ms ease;
        transition-property: left, top;
      }
      .react-grid-item img {
        pointer-events: none;
        user-select: none;
      }
      .react-grid-item.cssTransforms {
        transition-property: transform;
      }
      .react-grid-item.resizing {
        z-index: 1;
        will-change: width, height;
      }
      
      .react-grid-item.react-draggable-dragging {
        transition: none;
        z-index: 3;
        will-change: transform;
      }
      
      .react-grid-item.dropping {
        visibility: hidden;
      }
      
      .react-grid-item.react-grid-placeholder {
        background: red;
        opacity: 0.2;
        transition-duration: 100ms;
        z-index: 2;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
      }
      
      .react-grid-item > .react-resizable-handle {
        position: absolute;
        width: 20px;
        height: 20px;
      }
      
      .react-grid-item > .react-resizable-handle::after {
        content: "";
        position: absolute;
        right: 3px;
        bottom: 3px;
        width: 5px;
        height: 5px;
        border-right: 2px solid rgba(0, 0, 0, 0.4);
        border-bottom: 2px solid rgba(0, 0, 0, 0.4);
      }
      
      .react-resizable-hide > .react-resizable-handle {
        display: none;
      }
      
      .react-grid-item > .react-resizable-handle.react-resizable-handle-sw {
        bottom: 0;
        left: 0;
        cursor: sw-resize;
        transform: rotate(90deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-se {
        bottom: 0;
        right: 0;
        cursor: se-resize;
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-nw {
        top: 0;
        left: 0;
        cursor: nw-resize;
        transform: rotate(180deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-ne {
        top: 0;
        right: 0;
        cursor: ne-resize;
        transform: rotate(270deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-w,
      .react-grid-item > .react-resizable-handle.react-resizable-handle-e {
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-w {
        left: 0;
        transform: rotate(135deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-e {
        right: 0;
        transform: rotate(315deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-n,
      .react-grid-item > .react-resizable-handle.react-resizable-handle-s {
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-n {
        top: 0;
        transform: rotate(225deg);
      }
      .react-grid-item > .react-resizable-handle.react-resizable-handle-s {
        bottom: 0;
        transform: rotate(45deg);
      }
      
      /* React Resizable */
      
      .react-resizable {
        position: relative;
      }
      .react-resizable-handle {
        position: absolute;
        width: 20px;
        height: 20px;
        background-repeat: no-repeat;
        background-origin: content-box;
        box-sizing: border-box;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+");
        background-position: bottom right;
        padding: 0 3px 3px 0;
      }
      .react-resizable-handle-sw {
        bottom: 0;
        left: 0;
        cursor: sw-resize;
        transform: rotate(90deg);
      }
      .react-resizable-handle-se {
        bottom: 0;
        right: 0;
        cursor: se-resize;
      }
      .react-resizable-handle-nw {
        top: 0;
        left: 0;
        cursor: nw-resize;
        transform: rotate(180deg);
      }
      .react-resizable-handle-ne {
        top: 0;
        right: 0;
        cursor: ne-resize;
        transform: rotate(270deg);
      }
      .react-resizable-handle-w,
      .react-resizable-handle-e {
        top: 50%;
        margin-top: -10px;
        cursor: ew-resize;
      }
      .react-resizable-handle-w {
        left: 0;
        transform: rotate(135deg);
      }
      .react-resizable-handle-e {
        right: 0;
        transform: rotate(315deg);
      }
      .react-resizable-handle-n,
      .react-resizable-handle-s {
        left: 50%;
        margin-left: -10px;
        cursor: ns-resize;
      }
      .react-resizable-handle-n {
        top: 0;
        transform: rotate(225deg);
      }
      .react-resizable-handle-s {
        bottom: 0;
        transform: rotate(45deg);
      }
      
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script type="text/babel">

      
      const ResponsiveReactGridLayout = ReactGridLayout.WidthProvider(
        ReactGridLayout.Responsive
      );
      const defaultProps = {
        className: "layout",
        rowHeight: 30,
        onLayoutChange: function () {},
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        resizeHandles: ["se"],
      };
      
     
      
      const App = () => {
        function generateLayout() {
          return [
            { w: 2, h: 3, x: 10, y: 0, i: "0", moved: false, static: false },
            { w: 2, h: 3, x: 10, y: 3, i: "1", moved: false, static: false },
            { w: 2, h: 3, x: 10, y: 6, i: "2", moved: false, static: false },
            { w: 2, h: 3, x: 10, y: 12, i: "3", moved: false, static: false },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 15,
              i: "4",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 18,
              i: "5",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 21,
              i: "6",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 24,
              i: "7",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 27,
              i: "8",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 30,
              i: "9",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 33,
              i: "10",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 36,
              i: "11",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 39,
              i: "12",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 42,
              i: "13",
              moved: false,
              static: false,
              isDraggable: true,
            },
            {
              w: 2,
              h: 3,
              x: 10,
              y: 45,
              i: "14",
              moved: false,
              static: false,
              isDraggable: true,
            },
          ];
        
          return [1, 2, 3, 4].map(function (item, i) {
            var y = Math.ceil(Math.random() * 4) + 1;
            return {
              x: Math.round(Math.random() * 5) * 2,
              y: Math.floor(i / 6) * y,
              w: 2,
              h: y,
              i: i.toString(),
              static: Math.random() < 0.05,
            };
          });
        }
        const [state, setState] = React.useState({
          currentBreakpoint: "lg",
          compactType: "vertical",
          mounted: false,
          layouts: { lg: generateLayout() },
        });
      
        React.useEffect(() => {
          setState((prev) => ({ ...prev, mounted: true }));
        }, []);
      
        const generateDOM = () => {
          return state.layouts.lg.map(function (l, i) {
            return (
              <div
                key={l.i}
                className={
                  l.static
                    ? "static bg-red-500 rounded-md p-2"
                    : "bg-red-500 rounded-md p-2"
                }
              >
                {/* {l.static ? (
                  <span
                    className="text"
                    title="This item is static and cannot be removed or resized."
                  >
                    Static - {i}
                  </span>
                ) : (
                  <span className="text">{i}</span>
                )} */}
      
                <p className="text-[#067c7c] font-semibold uppercase">Unique views</p>
      
                <div className="flex justify-between space-x-4 ">
                  <h3 className="text-base font-semibold">icon src</h3>
                  <h3 className="text-3xl">987 views</h3>
                </div>
              </div>
            );
          });
        };
      
        const onBreakpointChange = (breakpoint) => {
          setState((prev) => ({
            ...prev,
            currentBreakpoint: breakpoint,
          }));
        };
      
        const onCompactTypeChange = () => {
          const { compactType: oldCompactType } = state;
          const compactType =
            oldCompactType === "horizontal"
              ? "vertical"
              : oldCompactType === "vertical"
              ? null
              : "horizontal";
          setState((prev) => ({ ...prev, compactType }));
        };
        React.useEffect(() => {
          console.log({ lg: state.layouts.lg });
        }, [state.layouts.lg]);
      
        const onLayoutChange = (layout, layouts) => {
          console.log({ layout, layouts });
      
          const updatedLayout = {
            layouts: { lg: layout },
          };
          setState((prev) => ({
            ...prev,
            ...updatedLayout,
          }));
        };
        const onDragStop = (layout, layouts) => {
          // const updatedLayout = {
          //   layouts: { lg: layout },
          // };
          // console.log({ layouts });
          // setState((prev) => ({
          //   ...prev,
          //   updatedLayout,
          // }));
        };
        const onResizeStop = (layout, layouts) => {
          // const updatedLayout = {
          //   layouts: { lg: layout },
          // };
          // setState((prev) => ({
          //   ...prev,
          //   updatedLayout,
          // }));
        };
      
        const onNewLayout = () => {
          setState((prev) => ({
            ...prev,
            layouts: { lg: generateLayout() },
          }));
        };
      
        const onDrop = (layout, layoutItem, _event) => {
          // setState((prev) => ({
          //   ...prev,
          //   layouts: {
          //     lg: layout,
          //   },
          // }));
        };
      
        return (
      
          
            <div style={{ background: "red", height: "1122.519685px" }}>
              <ResponsiveReactGridLayout
                {...defaultProps}
                layouts={state.layouts}
                onBreakpointChange={onBreakpointChange}
                onLayoutChange={onLayoutChange}
                onDragStop={onDragStop}
                onResizeStop={onResizeStop}
                onDrop={onDrop}
                // WidthProvider option
                measureBeforeMount={false}
            
                useCSSTransforms={state.mounted}
                compactType={state.compactType}
                preventCollision={!state.compactType}
                isDroppable={true}           
                margin={[10, 10]}
              >
                {generateDOM()}
              </ResponsiveReactGridLayout>
            </div>
       
        );
      };
      
      ReactDOM.render(<App />, document.querySelector("#root"));
      
      </script>
    </body>
  </html>`;

  await page.setContent(compileTailwind, { waitUntil: "networkidle0" });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: "./result.pdf",
    margin: {
      bottom: "15px", // minimum required for footer msg to display
      top: "15px",
      left: "15px",
      right: "15px",
    },
    format: "A4",
    printBackground: true,
  });

  // Close the browser instance
  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
});

app.listen(9000);

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
      
      class Grid extends React.Component {
        render() {
          const gridItems = [
            { id: 1, name: "Item One" },
            { id: 2, name: "Item Two" },
            { id: 3, name: "Item Three" },
            { id: 4, name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.asd asd asdasdas asdsad Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." },
            { id: 5, name: "Item Five" },
            { id: 6, name: "Item Six" },
            { id: 7, name: "Item Seven" },
            { id: 8, name: "Item Eight" },
            { id: 9, name: "Item Nine" },
          ];
          const layout = [
            { i: "1", x: 10, y: 0, w: 2, h: 2 },
            { i: "2", x: 10, y: 3, w: 2, h: 2 },
            { i: "3", x: 10, y: 6, w: 2, h: 2 },
            { i: "4", x: 10, y: 9, w: 2, h: 2 },
            { i: "5", x: 10, y: 12, w: 2, h: 2 },
            { i: "6", x: 10, y: 15, w: 2, h: 2 },
            { i: "7", x: 10, y: 18, w: 2, h: 2 },
            { i: "8", x: 10, y: 21, w: 2, h: 2 },
            { i: "9", x: 10, y: 24, w: 2, h: 2 },
          ];
     
          return (
            <ResponsiveReactGridLayout
              layouts={{ lg: layout }}
              measureBeforeMount={false}
              isDragable={true}
              isResizable={true}
              onDrag={this.onDragging}
              onDragStop={this.onMoveCard}
              onResizeStop={this.onResizeCard}
              margin={[10, 10]}
              containerPadding={[0,0]}
            >
              {gridItems.map((item, i) => {
                return (
                  <div key={item.id} className="no-break-inside bg-red-500 rounded-md p-2 parent" style={{padding:"10px"}}>
                  <p class="text-[#067c7c] font-semibold uppercase">Unique views</p>
                   <div class="parent" style={{marginTop:i==7?"10px":0}}>
                      <div class="flex justify-between space-x-4 wrapper">
                        <h3 class="text-base font-semibold">icon src</h3>
                        <h3 class="text-3xl">987 views</h3>
                      </div>
                   </div>
                  </div>
                );
              })}
            </ResponsiveReactGridLayout>
        
          );
        }
      }
      
      ReactDOM.render(<Grid />, document.querySelector("#root"));
      
      
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

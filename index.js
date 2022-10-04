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
      <script
        crossorigin
        src="https://unpkg.com/react@17/umd/react.production.min.js"
      ></script>
      <script
        crossorigin
        src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"
      ></script>
      <script
        src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"
        crossorigin="anonymous"
      ></script>
      <script src="https://unpkg.com/babel-standalone@6.26.0/babel.js"></script>
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
      <style>
      media @print {
        body: {
          font-size: "16px";
          color: "lightgrey";
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
      .react-grid-layout {
        position: relative;
        transition: height 200ms ease;
      }
      
      .react-grid-item {
        transition: all 200ms ease;
        transition-property: left, top;
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
        bottom: 0;
        right: 0;
        cursor: se-resize;
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
      
      .react-grid-item:not(.react-grid-placeholder) {
        background: grey;
      }
      .parent {
        display: block;
      }
      .wrapper {
        display: block;
        float: left;
        break-inside: avoid;
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
            { i: "1", x: 0, y: 0, w: 5, h: 2 },
            { i: "2", x: 5, y: 0, w: 3, h: 2 },
            { i: "3", x: 8, y: 0, w: 3, h: 2 },
            { i: "4", x: 0, y: 3, w: 5, h: 3 },
            { i: "5", x: 5, y: 3, w: 3, h: 2 },
            { i: "6", x: 8, y: 3, w: 3, h: 2 },
            { i: "7", x: 0, y: 6, w: 5, h: 2 },
            { i: "8", x: 5, y: 6, w: 3, h: 2 },
            { i: "9", x: 8, y: 6, w: 3, h: 2 },
          ];
     
          return (
            <ResponsiveReactGridLayout
              layouts={{ lg: layout }}
              measureBeforeMount={true}
              className="layout no-break-inside"
              isDragable={true}
              isResizable={true}
              onDrag={this.onDragging}
              onDragStop={this.onMoveCard}
              onResizeStop={this.onResizeCard}
              margin={[0, 0]}
            >
              {gridItems.map((item, i) => {
                return (
                  <div key={item.id} className="grid-item no-break-inside">
                    <p key={item.id} className="no-break-inside" >{item.name}</p>
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

import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { codeInfo, codeRecord } from "./Components/Data/HtmlCodeInfo";
import Header from "./Components/Header/Header";
import Split from "react-split";
import Editor from "./Components/Editors/Editor";
import Previewer from "./Components/Previewer/Previewer";
import AddCodeModal from "./Components/Modal/AddCodeModal";

library.add(fas);

function downloadFile(webCodes) {
  const fileBlob = new Blob(Array.from(webCodes));
  const url = URL.createObjectURL(fileBlob);
  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("target", "_blank");
  a.setAttribute("download", "index.html");
  a.click();
}

function App() {
  const savedCode = JSON.parse(window.sessionStorage.getItem("savedCode"));
  const savedCodeLength = window.sessionStorage.getItem("savedCodeLength");
  const [modalState, setModalState] = useState(false);
  const [codes, setCode] = useState(savedCode ? [...savedCode] : [...codeInfo]);
  const [codesNumber, setCodesNumber] = useState(
    savedCodeLength ? Number(savedCodeLength) : codeRecord.length
  );
  const [presentCodes, setWebCodes] = useState("");
  useEffect(() => {
    setWebCodes(document.querySelector("#htmlCodes").innerText);
    return () => {
      setWebCodes(document.querySelector("#htmlCodes").innerText);
    };
  }, [codes]);

  const webCodes = `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>我的網站</title>
  </head>
  <body>
      ${presentCodes}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      <script></script>
  </body>
  </html>`;

  function findArea(cursor, targetId, path, state) {
    if (cursor.id === targetId) {
      return state ? `${path}${cursor.id}` : path;
    }
    if (cursor.innerChild.length === 0) {
      return "";
    }
    return cursor.innerChild
      .map((item) => {
        return findArea(item, targetId, path + `${cursor.id}-`, state);
      })
      .join("");
  }

  function getDeleteCode(codes, cursor, path, deleteTargetIndex) {
    path.forEach((item) => {
      if (item) {
        let i = cursor.indexOf(cursor.filter((it) => it.id === item)[0]);
        cursor = cursor[i].innerChild;
      }
    });
    let source = cursor[deleteTargetIndex];
    cursor.splice(deleteTargetIndex, 1);
    setCode([...codes]);
    return source;
  }

  function addCode(codes, cursor, path, targetIndex, target) {
    path.forEach((item) => {
      if (item) {
        let i = cursor.indexOf(cursor.filter((it) => it.id === item)[0]);
        cursor = cursor[i].innerChild;
      }
    });
    cursor.splice(targetIndex, 0, target);
    setCode([...codes]);
  }

  function onHtmlCodeDragEnd(result) {
    const { draggableId, source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    if (draggableId === source.droppableId) {
      return;
    }

    let from = [];
    let end = [];

    codes.forEach((item) => {
      let thing = findArea(item, draggableId, "");
      from.push(thing ? thing : "");
    });
    from = from.join("").split("-");

    const tmp = getDeleteCode(codes, codes, from, source.index);

    if (destination.droppableId === "Trash") {
      return;
    }
    codes.forEach((item) => {
      let thing = findArea(item, destination.droppableId, "", "destination");
      end.push(thing ? thing : "");
    });

    end = end.join("").split("-");

    addCode(codes, codes, end, destination.index, tmp);

    window.sessionStorage.setItem("savedCode", JSON.stringify(codes));
  }

  function closeModalEventHandler() {
    setModalState(false);
  }

  function addHtmlCodeEventHandler() {
    const singleHTMLElement = ["img", "input", "br", "hr"];
    setCodesNumber(codesNumber + 1);
    window.sessionStorage.setItem("savedCodeLength", codesNumber);
    const elementName = document.querySelector("#htmlElementName");
    const elementId = document.querySelector(`#htmlElementId`);
    const elementClass = document.querySelector(`#htmlElementClass`);
    const elementStyle = document.querySelector(`#htmlElementStyle`);
    const elementContent = document.querySelector(`#htmlElementContent`);
    const elementExtraSetting = document.querySelector(
      `#htmlElementExtraSetting`
    );
    while (
      codeRecord.find((elmnt) => elmnt === `${elementName}_${codesNumber}`)
    ) {
      setCodesNumber(codesNumber + 1);
      window.sessionStorage.setItem("savedCodeLength", codesNumber);
    }
    const codeId = `${elementName.value}_${codesNumber}`;
    const codeInformation = {
      id: codeId,
      contextHeader: elementName.value,
      contextId: elementId.value,
      contextClass: elementClass.value,
      contextStyle: elementStyle.value,
      contextExtra: elementExtraSetting.value,
      innerContext: elementContent.value,
      innerChild: [],
      contextEnd: `${
        singleHTMLElement.find((element) => element === elementName.value)
          ? ""
          : elementName.value
      }`,
    };
    codes.push(codeInformation);
    setCode([...codes]);
    window.sessionStorage.setItem("savedCode", JSON.stringify(codes));
    elementName.value = "";
    elementId.value = "";
    elementClass.value = "";
    elementStyle.value = "";
    elementContent.value = "";
    elementExtraSetting.value = "";
    setModalState(false);
  }

  return (
    <div className="w-screen h-screen overflow-hidden">
      <AddCodeModal
        isModalOpen={modalState}
        modalType={`html`}
        modalTitle={`新增 HTML`}
        addCodeEventHandler={addHtmlCodeEventHandler}
        closeModalEventHandler={closeModalEventHandler}
      />
      <Header>加入 JS 神奇魔法</Header>
      {document.body.clientWidth < 640 ? (
        <Editor
          htmlCodeContents={codes}
          onHtmlCodeDragEndEventHandler={onHtmlCodeDragEnd}
          fixedCodeEventHandler={() => {}}
          openAddCodeAreaEventHandler={() => {
            setModalState(true);
          }}
          downloadFileHandler={() => {
            downloadFile(webCodes);
          }}
          webCodes={webCodes}
        />
      ) : (
        <Split
          className={`flex flex-row h-full`}
          minSize={250}
          gutterSize={6}
          sizes={[40, 60]}
        >
          <Editor
            htmlCodeContents={codes}
            onHtmlCodeDragEndEventHandler={onHtmlCodeDragEnd}
            fixedCodeEventHandler={() => {}}
            openAddCodeAreaEventHandler={() => {
              setModalState(true);
            }}
            downloadFileHandler={() => {
              downloadFile(webCodes);
            }}
            webCodes={webCodes}
          />
          <Previewer webCodes={webCodes} isActive={true} />
        </Split>
      )}
    </div>
  );
}

export default App;

import { 
  Undo, 
  Delete, 
  Palette, 
  Edit, 
  FiberManualRecord, 
  Download,
  TextFields,
  Help
} from "@mui/icons-material";

const useToolList = ({ onClear, onUndo, onDownload, onPencil, onText, drawTool, onHelp }) => {

  const tools = [
    {
      Icon: TextFields,
      label: "text",
      onClick: onText,
      selected: drawTool === "text"
    },
    {
      Icon: Edit,
      label: "pencil",
      onClick: onPencil,
      selected: drawTool === "pencil"
    },
    {
      Icon: FiberManualRecord,
      label: "pencil size",
      onClick: () => {console.log("SIZE")},
    },
    {
      Icon: Palette,
      label: "color",
      onClick: () => {console.log("COLOR")},
    },
    {
      Icon: Undo,
      label: "undo",
      onClick: onUndo,
    },
    {
      Icon: Delete,
      label: "clear",
      onClick: onClear,
    },
    {
      Icon: Download,
      label: "download",
      onClick: onDownload,
    },
    {
      Icon: Help,
      label: "help",
      onClick: onHelp,
    },
  ];


  return tools;
}

export default useToolList;
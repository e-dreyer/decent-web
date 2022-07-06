import { Box } from "@mui/system";
import Header from "./Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Box>
        <Header/>
        {/* Wrap the entire app in a box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "stretch",
            flexDirection: "column",
            alignItems: "center",
            my: 15,
            width: "75%",
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

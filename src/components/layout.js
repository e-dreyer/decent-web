import { Box } from "@mui/system";

export default function Layout({ children }) {
  return (
    <>
      <Box>
        {/* Wrap the entire app in a box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "stretch",
            flexDirection: "column",
            alignItems: "center",
            my: 20,
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

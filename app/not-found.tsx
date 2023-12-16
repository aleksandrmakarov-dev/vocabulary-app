import FullScreenWrapper from "@/components/shared/fullscreen-wrapper/FullScreenWrapper";
import Routing from "@/lib/routing";
import { Button } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <FullScreenWrapper>
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-1">Not found – 404!</h1>
        <p className="mb-5 text-lg">
          The page you are looking for does not exist
        </p>
        <Button href={Routing.root} variant="contained" disableElevation>
          Back to home
        </Button>
      </div>
    </FullScreenWrapper>
  );
}

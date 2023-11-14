import "styles/stylespage.scss";
import { ReactNode } from "react";
import AppBar from "./AppBar";
import { AuthContextProvider } from "./Providers";
interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <div className="flex h-auto flex-col">
            <AppBar />
            <div className="h-screen flex justify-center">{children}</div>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}

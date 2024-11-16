import { ConnectKitProvider } from "@particle-network/connectkit";
import { particleConfig } from "../config/config";


// Wrap your application with this component.
export const ParticleConnectKitProvider = ({ children }: React.PropsWithChildren) => {
    return <ConnectKitProvider config={particleConfig}>{children}</ConnectKitProvider>;
};
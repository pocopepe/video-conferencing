import { RecoilRoot } from "recoil";
import MediaPlayer from "./components/mediaplayer";

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <MediaPlayer />
        </RecoilRoot>
    );
};

export default App;

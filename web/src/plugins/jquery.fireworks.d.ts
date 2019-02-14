interface FireWorksOption {
    sound: boolean;
    opacity: number;
    width: number;
    height: number;
}
interface JQuery {
    fireworks: (option: FireWorksOption) => void;
}
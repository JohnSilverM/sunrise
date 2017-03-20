import { Selector } from 'testcafe';

export default class LotteryLobby {
    constructor() {
        this.lotteryLobbyTitle = Selector('.title.normal');
    }
}
import { Selector } from 'testcafe';

export default class MainLobby {
    constructor() {
        this.lotteryButton = Selector('#lotteryButton');
    }
}
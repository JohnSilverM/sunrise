import LotteryLobby from './pages/lotteryLobby';
import MainLobby from './pages/mainLobby';

fixture `Example of TestCafe`
    .page `https://norsk-tipping.no/mobile-internet/`;

const mainLobby = new MainLobby();
const lotteryLobby = new LotteryLobby();

test('Open lottolobby', async t => {
    await t
        .click(mainLobby.lotteryButton)
        .expect(lotteryLobby.lotteryLobbyTitle).ok()
        .wait(10000);
});
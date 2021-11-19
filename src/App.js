import { useEffect, useState } from "react";
import "./App.css";
import {
  Header,
  Button,
  Container,
  Image,
  Modal,
  Grid,
} from "semantic-ui-react";
import { ScatterBoxLoader } from "react-awesome-loaders";
import { gameItems } from "./items.js";
import { ethers } from "ethers";

function App() {
  const [cards, setCards] = useState(null);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [loading, setLoader] = useState(false);
  const [wallet, setWallet] = useState(null);

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    const shuffledCards = [...gameItems] // 2 lots of card images
      .sort(() => Math.random() - 0.5) // shuffled array
      .map((card) => ({ ...card, id: Math.random() })); // add on random ID number to each card
    console.log(shuffledCards);
    setCards(shuffledCards);
  };

  const burnItemPress = (item) => {
    setOpen(false);
    setLoader(true);

    const timeId = setTimeout(() => {
      setLoader(false);
    }, 10000);

    // CALL BURN API
    console.log(`BURN API HERE!`);
  };

  const connectWalletPress = async () => {
    console.log(`CONNECT TO METAMASK`);
    // CONNECT TO WALLET
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner();
    console.log(signer);

    const connect = await window.ethereum.enable();
    if (connect) setWallet(connect);
    console.log(`connect: ${connect}`);

    // Look up the current block number
    const blockNumber = await provider.getBlockNumber();
    console.log(`blockNumber: ${blockNumber}`);
    // 13451439

    // Get the balance of an account (by address or ENS name, if supported by network)
    const balance = await provider.getBalance("ethers.eth");
    const balanceFormatted = ethers.utils.formatEther(balance);
    // '2.337132817842795605'
    console.log(`balance: ${balanceFormatted}`);
    // { BigNumber: "2337132817842795605" }

    // SEND ETH ****
    // const tx = await signer.sendTransaction({
    //   to: "0x890CD5f0B0A484d160A13aB832aD9bd5Bd507B0E",
    //   value: ethers.utils.parseEther("0.00001"),
    // });
  };

  const refreshPress = () => {
    // REFRESH ACTION
  };

  const ItemGrid = () => {
    return (
      <Grid centered={true}>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Image
              className="item"
              src={cards[0].src}
              onClick={() => showModal(cards[0])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[1].src}
              onClick={() => showModal(cards[1])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[2].src}
              onClick={() => showModal(cards[2])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[3].src}
              onClick={() => showModal(cards[3])}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Image
              className="item"
              src={cards[4].src}
              onClick={() => showModal(cards[4])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[5].src}
              onClick={() => showModal(cards[5])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[6].src}
              onClick={() => showModal(cards[6])}
            />
          </Grid.Column>
          <Grid.Column>
            <Image
              className="item"
              src={cards[7].src}
              onClick={() => showModal(cards[7])}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  const LoadingBurnModal = () => {
    return (
      <Modal
        size="small"
        open={loading}
        style={{
          border: "15px solid",
          color: "midnightblue",
          borderRadius: "20px",
        }}
      >
        <Header
          size="huge"
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          BURNING...
        </Header>
        <Modal.Content
          style={{
            backgroundColor: "#000000",
            color: "white",
          }}
        >
          <div
            style={{
              paddingLeft: "115px",
              marginLeft: "115px",
              paddingBottom: "50px",
            }}
          >
            <ScatterBoxLoader primaryColor={"lime"} background={"#000000"} />
          </div>
        </Modal.Content>
      </Modal>
    );
  };

  const ItemModal = ({ item }) => {
    console.log(item);
    return (
      <div>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          style={{
            border: "15px solid",
            color: "midnightblue",
            borderRadius: "20px",
          }}
        >
          <Header
            size="large"
            style={{
              backgroundColor: "#000000",
              color: "white",
            }}
          >
            BURN?
          </Header>
          <Modal.Content image style={{ backgroundColor: "#000" }}>
            <Image size="medium" src={item?.src} wrapped />
            <Modal.Description style={{ width: "100%" }}>
              <Header size="large" style={{ color: "yellow" }}>
                {item.name}
              </Header>
              <p style={{ color: "red" }}>LEVEL: {item.level}</p>
              <p style={{ color: "forestgreen" }}>{item.stats}</p>
              <p style={{ color: "white" }}>{item.description}</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions style={{ backgroundColor: "#000" }}>
            <Button
              color="black"
              inverted="true"
              size="huge"
              onClick={() => setOpen(false)}
            >
              Nope
            </Button>
            <Button
              content="BURN!"
              onClick={() => burnItemPress(item)}
              size="huge"
              inverted="true"
              color="green"
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  };

  const showModal = (card) => {
    setItem(card);
    setOpen(true);
    //console.log(card);
  };

  // Shuffle items
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <Container className="center">
      <div>
        <Button
          inverted="true"
          color="green"
          size="huge"
          onClick={() => refreshPress()}
          className="refresh-button"
        >
          REFRESH
        </Button>
        <Button
          inverted="true"
          color="green"
          size="huge"
          onClick={() => connectWalletPress(item)}
          className="transfer-button"
        >
          {wallet ? "CONNECTED" : "CONNECT WALLET"}
        </Button>
        <Header
          size="huge"
          style={{
            backgroundColor: "#000000",
            color: "white",
            marginBottom: "40px",
          }}
        >
          NFTransfer
        </Header>
        {cards ? <ItemGrid /> : null}
        {item ? <ItemModal item={item} /> : null}
        <LoadingBurnModal />
      </div>
    </Container>
  );
}

export default App;

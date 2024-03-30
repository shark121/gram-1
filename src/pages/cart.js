import { motion } from "framer-motion";
import { useEffect, useRef  , useState } from "react";
import Image from "next/image";
import iphone from "../images/iphone.jpg";
import Link from "next/link";
import DeliveryInfo from "./DeliveryInfo/deliveryInfo";
import { useRouter } from "next/router";
import { database, app } from "../../firebaseConfig";
import {
  getDoc,
  doc,
  getDocs,
  addDoc,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Pieces from "../../components/ui/Pieces";
import DeleteIcon from "../images/svgImages/deleteIcon";
import { data } from "autoprefixer";
import { idGenerator } from "../lib/Globalfunctions/idGenerator";
import { createContext } from "react";
import { currentQuantityAtom } from "../../components/ui/Pieces";
import { useSelector, useDispatch, Provider } from "react-redux";
import {
  setCart,
  deleteItem,
  setTotal,
  removeProps,
} from "./GlobalRedux/features/cartSlice";

export const TotalContext = createContext();

const tax = 0;

let auth = getAuth();
const povider = new GoogleAuthProvider();

function addIndividualStyle(name) {
  if (name === "type") {
    return "font-bold text-[#Ff0066] text-[1rem]";
  } else if (name === "image") {
    return "";
  } else {
    return "text-[0.9rem]";
  }
}

function Cart({ pricesObject }) {
  let priceData = pricesObject;

  const router = useRouter();


  const { cartDataState, total } = useSelector((state) => state.cart);
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [fullNameState, setFullNameState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [cityState, setCityState] = useState("");
  const [regionState, setRegionState] = useState("");
  const [addressDescriptionState, setAddressDescriptionState] = useState("");
  const [itemsDataState, setItemsDataState] = useState([]);
  const [pricesState, setPricesState] = useState(0);
  const [hasProvidedInformation, setHasProvidedInformation] = useState(false);
  const [shouldDisplayShippingInfoWindow, setShouldDisplayShippingInfoWindow] =
    useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    let priceTotal = 0;

    let CART_DATA = [];

    let ID_LIST = [];

    let collectedIds = JSON.parse(sessionStorage.getItem("ID_ARRAY"));

    for (let key in collectedIds) {
      ID_LIST.push(collectedIds[key]);
    }

    for (let key in collectedIds) {
      let currentElement = JSON.parse(
        sessionStorage.getItem(collectedIds[key])
      );

      let getType = currentElement.type;
      let getPrice = priceData[getType];

      if (!currentElement.price) currentElement.price = getPrice;

      CART_DATA.push(currentElement);

      priceTotal = priceTotal + currentElement.price * currentElement.qty;
      setPricesState(priceTotal);
      sessionStorage.setItem("currentTotal", priceTotal);
    }

    dispatch(setCart(CART_DATA));
    dispatch(setTotal(priceTotal));
  }, []);

  async function handleOnClick() {
    dispatch(removeProps());

    if (!auth.currentUser) {
      signInWithPopup(auth, povider)
      return;
    }

    console.log(auth.currentUser.uid);

    if (!hasProvidedInformation) {
      setShouldDisplayShippingInfoWindow(true);
      return;
    }

    const orderID = idGenerator();

    const usersCollectionRef = collection(
      database,
      "USERS",
      auth.currentUser.uid,
      "orders"
    );

    await addDoc(usersCollectionRef, {
      orderID: orderID,
    })
      .then(async () => {
        const ordersCollectionRef = collection(database, "ORDERS");
        const orderDocument = doc(ordersCollectionRef, orderID);
        await setDoc(orderDocument, {
          userUid: auth.currentUser.uid,
          itemsInfo: cartDataState,
          orderConfirmed: true,
          paymentReceived: false,
          packageReady: false,
          deliveryOnRoute: false,
          pickupAvailable: false,
          createdAt: new Date().toUTCString(),
          phoneNumber : phoneNumberState,
          fullName : fullNameState,
          address : addressState,
          city : cityState,
          region : regionState,
          addressDescription : addressDescriptionState,
        });
      })
      .then(() => {
        console.log("order added successfully");
        router.push(`/OrderPage?orderID=${orderID}`);
      });
  }

  function updateSessionStorage(id) {
    sessionStorage.removeItem(id);

    let idArray = JSON.parse(sessionStorage.getItem("ID_ARRAY"));

    console.log(idArray);

    let filteredIdArray = idArray.filter((idElement) => idElement != id);

    let idArrayParsedToString = JSON.stringify(filteredIdArray);

    sessionStorage.setItem("ID_ARRAY", idArrayParsedToString);
  }

  function handleDelete(id, price) {
    updateSessionStorage(id);

    dispatch(deleteItem({ id, price }));
  }

  function DropCardDivision({ name, info }) {
    let shouldExclude = ["price", "id", "maximum", "img", "qty"];

    // console.log(name,info)
    if (!shouldExclude.includes(name))
      return (
        <div className="my-4 h-[1rem] w-full text-lg">
          <div
            className={`m-2 text-left text-[0.9rem]  ${addIndividualStyle(
              name
            )} `}
          >
            {info}
          </div>
        </div>
      );
  }

  function DropCard({ data }) {
    let list = [];
    let maximum = data.maximum;
    let id = data.id;
    let price = data.price;

    for (let key in data) {
      list.push(<DropCardDivision name={key} info={data[key]} key={key} />);
    }
    return (
      <div className=" m-4 text-gray-400">
        <div className="flex min-h-[5rem] w-full items-center justify-center p-4 text-left text-[0.9rem] ">
          <div className="relative flex h-[7rem] w-[10rem] justify-between ">
            <Image
              src={data.img}
              height={60}
              width={60}
              className=" rounded-2xl object-contain"
              alt={"phone image"}
            />
          </div>
          <div className="flex h-full w-full  items-center justify-center">
            <div className="h-full w-[70%] p-4">
              {...list}
              <button
                className="ml-1 h-[1.8rem] w-[1.8rem]"
                onClick={() => handleDelete(id, price)}
              >
                <DeleteIcon />
              </button>
            </div>
            <div
              className="flex h-[100%]  w-[30%] flex-col items-center justify-center "
              // onClick={setPricesState(sessionStorage.getItem("currentTotal"))}
            >
              <Pieces max={maximum} id={id} price={price} />{" "}
            </div>
          </div>
        </div>
        <div className="text-right font-extrabold text-[#Ff0066]">
          ₵{data.price}
        </div>
      </div>
    );
}

  let list = cartDataState.map((element, key) => {
    return <DropCard data={element} key={key} />;
  });

  if (shouldDisplayShippingInfoWindow)
    return (
      <DeliveryInfo
        setHasProvidedInformation={setHasProvidedInformation}
        setShouldDisplayShippingInfoWindow={setShouldDisplayShippingInfoWindow}
        setPhoneNumberState={setPhoneNumberState}
        setFullNameState={setFullNameState}
        setAddressState={setAddressState}
        setCityState={setCityState}
        setRegionState={setRegionState}
        setAddressDescriptionState={setAddressDescriptionState}

      />
    );
  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center bg-[#] py-4">
      <div className="relative flex min-h-screen w-screen flex-col items-center md:w-[30rem] md:rounded-2xl">
        <div className="my-4 flex h-[7rem] w-full flex-col items-center justify-center px-4">
          <div className="h-[4rem] w-full text-[2.1rem] text-gray-500">
            {"Cart."}
          </div>
          <button
            className="flex h-[2rem] w-full items-center gap-10 text-[1.5rem] text-gray-400"
            onClick={() => router.push("/")}
          >
            <div className="pointer flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-gray-200 text-[2rem] text-gray-400">
              +
            </div>
          </button>
        </div>
        <div className=" items-left flex min-h-[50vh] w-full flex-col justify-center rounded-xl bg-white">
          {...list}
        </div>
        <div className="items-left flex h-[6rem] w-[18rem] flex-col justify-center rounded-lg bg-gray-200 p-4 font-bold text-gray-500 sm:w-full">
          <div className="flex justify-between">
            <div>subtotal</div>
            <div>{total}</div>
          </div>

          <div className="flex justify-between">
            <div>tax</div>
            <div>{tax}</div>
          </div>
        </div>
        <button
          className="  m-4 w-[18rem] justify-self-end bg-gray-800 p-4 font-semibold text-white sm:w-full"
          onClick={handleOnClick}
        >
          place order
        </button>
      </div>
    </div>
  );
}

export default Cart;

export async function getStaticProps() {
  const collectionRef = collection(database, "prices");

  let dataArray = [];

  await getDocs(collectionRef).then((data) => {
    data.docs.forEach((element) => dataArray.push(element.data()));
  });

  let pricesObject = {};

  for (let object of dataArray) {
    Object.assign(pricesObject, object);
  }

  console.log(pricesObject);

  return {
    props: {
      pricesObject: pricesObject,
    },
  };
}

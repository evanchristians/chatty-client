import io from "socket.io-client";
import { ENDPOINT } from "../constants";

export const socket = io(ENDPOINT);

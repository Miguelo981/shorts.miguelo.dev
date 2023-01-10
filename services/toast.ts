import { toast } from "react-hot-toast";

export function positiveFeedback(message: string) {
  toast.success(message, {
    duration: 4000,
    position: "bottom-center",
  });
}

export function negativeFeedback(message: string) {
    toast.error(message, {
      duration: 4000,
      position: "bottom-center",
    });
}

/* ./node_modules/keyv/src/index.js
Critical dependency: the request of a dependency is an expression */
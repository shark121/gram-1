import { OTPInput } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  OTPInputProps,
} from "../../src/components/ui/input-otp";
import { Input } from "postcss";

function Inputs(){
  console.log(OTPInput)
}
export default function Vererify({ setUserOtpState, confirmResponse }) {
Inputs()
  return (
    <InputOTP
      maxLength={6}
      render={({ slots }) => (
        <>
          <InputOTPGroup>
            {slots.slice(0, 3).map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}{" "}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {slots.slice(3).map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}
          </InputOTPGroup>
        </>
      )}
    />
  );
}

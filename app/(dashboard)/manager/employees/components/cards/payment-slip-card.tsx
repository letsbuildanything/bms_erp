import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonCard from "./card";


const PaymentSlip = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CommonCard title="Payment Slip" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[585px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            <span className="text-yellow-600">⚠</span> Every Field is required here
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};

export default PaymentSlip;



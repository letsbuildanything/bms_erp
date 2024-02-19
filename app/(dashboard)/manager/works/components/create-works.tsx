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
import CreateWorkForm from "./forms/create-work-form";

const CreateWorks = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Work</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[585px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Work</DialogTitle>
          <DialogDescription>
            <span className="text-yellow-600">⚠</span> Every Field is required here
          </DialogDescription>
        </DialogHeader>
       
        <CreateWorkForm />
        
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorks;

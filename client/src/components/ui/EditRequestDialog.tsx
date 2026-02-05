import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useCreateEditRequest } from "@/hooks/use-collections";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEditRequestSchema } from "@shared/schema";

const formSchema = insertEditRequestSchema;
type FormValues = z.infer<typeof formSchema>;

export function EditRequestDialog() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const mutation = useCreateEditRequest();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userEmail: user?.email || "",
      templateName: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Request Sent!",
          description: "Our editors will review your request and get back to you.",
        });
        setOpen(false);
        form.reset();
      },
      onError: (err) => {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-black border border-primary text-white hover:bg-primary/10 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-all duration-300 neon-border rounded-xl font-display font-semibold text-lg py-6"
        >
          <Wand2 className="mr-2 h-5 w-5 text-primary" />
          Request Custom Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Need Professional Editing?</DialogTitle>
          <DialogDescription className="text-white/60">
            Send us your clips and we'll apply the template perfectly for you.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input 
              id="email" 
              placeholder="name@example.com" 
              {...form.register("userEmail")} 
              className="bg-black/50 border-white/10 focus:border-primary"
            />
            {form.formState.errors.userEmail && (
              <span className="text-xs text-red-400">{form.formState.errors.userEmail.message}</span>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template">Template Name</Label>
            <Input 
              id="template" 
              placeholder="e.g. Beat Sync V2" 
              {...form.register("templateName")}
              className="bg-black/50 border-white/10 focus:border-primary" 
            />
             {form.formState.errors.templateName && (
              <span className="text-xs text-red-400">{form.formState.errors.templateName.message}</span>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Instructions (Optional)</Label>
            <Textarea 
              id="message" 
              placeholder="Any specific timing or clips you want to highlight?" 
              {...form.register("message")}
              className="bg-black/50 border-white/10 focus:border-primary min-h-[100px]" 
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-white mt-4"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

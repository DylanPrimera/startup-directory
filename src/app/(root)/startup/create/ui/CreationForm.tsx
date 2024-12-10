"use client";
import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { FiSend } from "react-icons/fi";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export const CreationForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPich] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);
      console.log({ formValues });
      // const result = await createIdea(prevState, formData, pitch)
      // if(result.status === 'SUCCESS') {
      //   toast({
      //     title: "Success",
      //     description: "Your startup has been submitted",
      //   });
      //   router.push(`/startup/${result.id}`)
      // }
      // return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "Please check your form data",
          variant: "destructive",
        });
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      return { ...prevState, error: "Something went wrong", status: "ERROR" };
    }
  };
  const [state, formAction, isPending] = useActionState(
    handleFormSubmit,
    {
      error: "",
      status: "INITIAL",
    },
    ""
  );

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          className="startup-form_input"
          required
          placeholder="Put the title of the startup"
        />
        {errors.title && (
          <span className="startup-form_error">{errors.title}</span>
        )}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Put the description of the startup"
        />
        {errors.description && (
          <span className="startup-form_error">{errors.description}</span>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          type="text"
          className="startup-form_input"
          required
          placeholder="Put the category of the startup  (Tech, Healt, Education...)"
        />
        {errors.category && (
          <span className="startup-form_error">{errors.category}</span>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          type="text"
          className="startup-form_input"
          required
          placeholder="Paste a link to your demo or promotional media"
        />
        {errors.link && (
          <span className="startup-form_error">{errors.link}</span>
        )}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPich(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {errors.pitch && (
          <span className="startup-form_error">{errors.pitch}</span>
        )}
      </div>
      <Button type="submit" className="startup-form_btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
        {!isPending && <FiSend size={20} />}
      </Button>
    </form>
  );
};

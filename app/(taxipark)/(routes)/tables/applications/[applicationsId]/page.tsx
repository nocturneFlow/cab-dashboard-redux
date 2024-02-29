import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

const ApplicationsAddPage = async () => {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Заявки" description="Создание заявки" />
          </div>
          <Separator />
        </div>
      </div>
    </>
  );
};

export default ApplicationsAddPage;

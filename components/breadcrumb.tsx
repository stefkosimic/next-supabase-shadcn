import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Breadcrumb = ({ breadCrumb }: any) => {
  return (
    <BaseBreadcrumb className="hidden px-4 md:block">
      <BreadcrumbList>
        {breadCrumb?.length ? (
          breadCrumb.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4">
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>

              {index < breadCrumb.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))
        ) : (
          <></>
        )}
      </BreadcrumbList>
    </BaseBreadcrumb>
  );
};

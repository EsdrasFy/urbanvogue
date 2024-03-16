import { CardV } from "@/components/card/vertical";
import { ProductI } from "@/interfaces/product/card/index";

interface GridSearchProps {
  data?: ProductI[] | null;
}

function GridSearch({ data }: GridSearchProps) {
  return (
    <section className="grid-search">
      {data && data.length > 0
        ? data.map((product) => <CardV key={product.id} data={product} />)
        : Array.from({ length: 23 }).map((_, index) => (
            <div
              key={index}
              role="status"
              className="w-[164px] h-[339px] shadow-snipped rounded-lg animate-pulse dark:border-gray-700"
            >
              <div className="flex rounded-lg items-center justify-center h-[227px] mb-4 bg-custom-grayThree dark:bg-custom-grayThree">
                <svg
                  className="rounded-md w-10 h-10 text-custom-grayOne dark:text-custom-grayOne"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[155px] mb-2 ml-1"></div>
              <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[135px] mb-4 ml-1"></div>
              <div className="h-4 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[120px] mb-2 ml-1"></div>
              <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[110px] mb-4 ml-1"></div>
            </div>
          ))}
      <div
        role="status"
        className="w-[164px] h-[339px] shadow-snipped rounded-lg animate-pulse dark:border-gray-700"
      >
        <div className="flex rounded-lg items-center justify-center h-[227px] mb-4 bg-custom-grayThree dark:bg-custom-grayThree">
          <svg
            className="rounded-md w-10 h-10 text-custom-grayOne dark:text-custom-grayOne"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[155px] mb-2 ml-1"></div>
        <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[135px] mb-4 ml-1"></div>
        <div className="h-4 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[120px] mb-2 ml-1"></div>
        <div className="h-2.5 bg-custom-grayThree rounded-full dark:bg-gray-700 w-[110px] mb-4 ml-1"></div>
      </div>
    </section>
  );
}

export {GridSearch};

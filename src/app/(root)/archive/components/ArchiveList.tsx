"use client";
import { useEffect, useState } from "react";
import { CategoryKey, matchCategory } from "../[[...category]]/page";
import ArchiveCard from "./ArchiveCard";
import { getArchiveList } from "@/api/getArchiveList";
import { APIerror } from "@/api/getChatMsgMento";
import Spinner from "@/shared/components/Spinner";
import Pagination from "@/shared/components/Pagination";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const matchCatResponse = {
  KAKAO_TALK: "kakaotalk",
  YOUTUBE: "youtube",
  KTX: "ktx",
  INTERCITY_BUS: "bus",
  BAEMIN: "delivery",
  COUPANG: "coupang",
};

interface ArchiveType {
  id: number;
  title: string;
  thumbnail: { file_url: string };
  createdAt: string;
  category: ResponseCatKey;
}

interface ArchiveResponseType {
  archives: ArchiveType[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
}

export type ResponseCatKey = keyof typeof matchCatResponse;

function ArchiveList({ category }: { category: CategoryKey }) {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [archiveList, setArchiveList] = useState<ArchiveResponseType | null>(
    null
  );
  const [input, setInput] = useState(keyword || "");

  useEffect(() => {
    const getArchives = async () => {
      try {
        setIsLoading(true);
        const res = await getArchiveList({
          category: matchCategory[category].cat,
          keyword: keyword,
          page: String(currentPage - 1),
        });
        setArchiveList(res);
      } catch (e) {
        const error = e as APIerror;
        alert(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getArchives();
  }, [category, currentPage, keyword]);

  useEffect(() => {
    document
      .querySelector("#archiveScrollContainer")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`?keyword=${input}`);
  };

  return (
    <>
      <form
        className="flex justify-between items-center gap-3 px-5 py-3"
        onSubmit={handleSearch}
      >
        <label htmlFor="keyword" className="sr-only">
          검색
        </label>
        <Input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="검색어를 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" color="darkgreen">
          검색
        </Button>
      </form>
      <ul className="p-5 pt-0 flex flex-col gap-5">
        {archiveList ? (
          isLoading ? (
            <Spinner />
          ) : archiveList.archives.length === 0 ? (
            <p className="flex-center">자료가 없습니다</p>
          ) : (
            archiveList.archives.map(
              ({ id, title, thumbnail, createdAt, category }) => (
                <ArchiveCard
                  key={id}
                  cardInfo={{
                    id,
                    imgsrc: thumbnail?.file_url ?? undefined,
                    title: title,
                    category:
                      matchCategory[matchCatResponse[category] as CategoryKey]
                        .text,
                    createdAt: createdAt.slice(0, 10),
                  }}
                />
              )
            )
          )
        ) : null}
      </ul>
      <Pagination
        totalPages={!isLoading && archiveList ? archiveList.totalPages : 0}
        currentPage={currentPage}
        keyword={keyword}
      />
    </>
  );
}

export default ArchiveList;

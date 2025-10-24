import { ResponseCatKey } from "@/app/(root)/archive/components/ArchiveList";
import { BASE_URL } from "./constants/config";
import { APIerror } from "./getChatMsgMento";

interface ArchiveThumbnail {
  id: number;
  file_name: string;
  file_url: string;
  file_type: string;
}

export interface ArchiveItem {
  id: number;
  title: string;
  category: string;
  thumbnail: ArchiveThumbnail | null;
  createdAt: string;
}

export const getArchiveList = async ({
  page,
  keyword,
  category,
}: {
  page: string;
  keyword?: string;
  category?: ResponseCatKey;
}) => {
  const requestAPIUrl = category
    ? keyword // 카테고리 o
      ? `${BASE_URL}/api/v1/archive/public?category=${category}&keyword=${keyword}&page=${page}&size=10&sort=createdAt`
      : `${BASE_URL}/api/v1/archive/public?category=${category}&page=${page}&size=10&sort=createdAt`
    : keyword // 카테고리 x
    ? `${BASE_URL}/api/v1/archive/public?keyword=${keyword}&page=${page}&size=10&sort=createdAt`
    : `${BASE_URL}/api/v1/archive/public?page=${page}&size=10&sort=createdAt`;

  const res = await fetch(requestAPIUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset: UTF-8",
    },
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) {
    const error: APIerror = { status: data.code, message: data.message };
    throw error;
  }

  const updatedData = {
    ...data.data,
    archives: data.data.archives.map((item: ArchiveItem) => ({
      ...item,
      thumbnail: item.thumbnail
        ? {
            ...item.thumbnail,
            file_url: `${BASE_URL}/uploads/${item.thumbnail.file_url}`,
          }
        : null,
    })),
  };

  return updatedData;
};

export const getArchiveSearchList = async ({
  keyword,
  page,
}: {
  keyword: string;
  page: string;
}) => {
  getArchiveList({ keyword, page });
};

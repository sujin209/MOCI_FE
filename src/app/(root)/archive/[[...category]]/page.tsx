import KaKaoIcon from "@/assets/logos/KakaoTalk_logo.svg";
import KTXLogo from "@/assets/logos/KTX_logo.svg";
import YouTubeLogo from "@/assets/logos/YouTube_logo.svg";
import CoupangLogo from "@/assets/logos/Coupang_logo.svg";
import BusLogo from "@/assets/logos/Bus_logo.svg";
import Delivery from "@/assets/logos/Delivery_logo.svg";
import ButtonGroup from "@/shared/components/ButtonGroup";
import ArchiveButtons from "../components/ArchiveButtons";
import HomeButton from "../components/HomeButton";
import Image from "next/image";
import ArchiveList from "../components/ArchiveList";

export const matchCategory = {
  kakaotalk: { text: "카카오톡", cat: "KAKAO_TALK" },
  ktx: { text: "기차", cat: "KTX" },
  youtube: { text: "유튜브", cat: "YOUTUBE" },
  coupang: { text: "쿠팡", cat: "COUPANG" },
  delivery: { text: "배달", cat: "BAEMIN" },
  bus: { text: "버스", cat: "INTERCITY_BUS" },
  all: { text: "전체자료", cat: undefined },
} as const;

export type CategoryKey = keyof typeof matchCategory;
// type CategoryValue = (typeof matchCategory)[CategoryKey];

async function Page({
  params,
}: {
  params?: Promise<{ category: CategoryKey }>;
}) {
  const param = await params;
  const category = param?.category ?? "all";
  const items = [
    {
      icon: <KaKaoIcon />,
      label: "카카오톡",
      href: "/archive/kakaotalk",
      className: `${
        category[0] === "kakaotalk" && "bg-yellow-default border-4"
      }`,
    },
    {
      icon: <KTXLogo />,
      label: "KTX",
      href: "/archive/ktx",
      className: `${category[0] === "ktx" && "bg-yellow-default border-4"}`,
    },
    {
      icon: (
        <YouTubeLogo className="rounded-lg border border-gray-100 object-contain" />
      ),
      label: "유튜브",
      href: "/archive/youtube",
      className: `${category[0] === "youtube" && "bg-yellow-default border-4"}`,
    },
    {
      icon: (
        <CoupangLogo className="bg-white rounded-lg border border-gray-100 object-contain " />
      ),
      label: "쿠팡",
      href: "/archive/coupang",
      className: `${category[0] === "coupang" && "bg-yellow-default border-4"}`,
    },
    {
      icon: <BusLogo />,
      label: "버스",
      href: "/archive/bus",
      className: `${category[0] === "bus" && "bg-yellow-default border-4"}`,
    },
    {
      icon: <Delivery className="rounded-lg w-[50px] h-[50px]" />,
      label: "배달",
      href: "/archive/delivery",
      className: `${
        category[0] === "delivery" && "bg-yellow-default border-4"
      }`,
    },
  ];

  const categoryIcons: Record<CategoryKey, React.ReactNode> = {
    kakaotalk: <KaKaoIcon className="w-9 h-9" />,
    ktx: <KTXLogo className="w-9 h-9" />,
    youtube: (
      <YouTubeLogo className="w-9 h-9 rounded-lg border border-gray-100" />
    ),
    coupang: (
      <CoupangLogo className="w-9 h-9 rounded-lg border border-gray-100" />
    ),
    bus: <BusLogo className="w-9 h-9" />,
    delivery: <Delivery className="w-9 h-9 rounded-lg" />,
    all: (
      <Image
        src="/logo.png"
        alt="디딤돌 로고"
        width={36}
        height={36}
        style={{ width: "auto" }}
        priority
      />
    ),
  };

  return (
    <div className="flex flex-col gap-2 h-[calc(100dvh-48px)]">
      <HomeButton />
      <div
        className="flex-1 overflow-y-scroll min-h-0"
        id="archiveScrollContainer"
      >
        <h1 className="text-3xl text-darkgreen-default font-bold px-3 py-2">
          자주 찾는 서비스
        </h1>
        <div className="bg-lightyellow p-3 h-80">
          <ButtonGroup items={items} />
        </div>
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center gap-3">
            {categoryIcons[category]}
            <h1 className="text-3xl text-darkgreen-default font-bold">
              {matchCategory[category].text}
            </h1>
          </div>
          <ArchiveButtons />
        </div>
        <ArchiveList category={category} />
      </div>
    </div>
  );
}
export default Page;

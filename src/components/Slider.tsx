import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import classes from "./Slider.module.css";

type Url = {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
};

export default function Slider(props: {
  urls: string;
  page: string;
  limit: string;
}) {
  const [images, setImages] = useState<Url[]>([]);
  const [messages, setMessages] = useState<"Loading" | "Error" | null>(
    "Loading"
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { urls, page, limit } = props;

  useEffect(() => {
    setMessages("Loading");
    fetch(`${urls}?page=${page}&limit=${limit}`).then((response) =>
      response
        .json()
        .then((data) => {
          setMessages(null);
          setImages(data);
        })
        .catch(() => setMessages("Error"))
    );
  }, []);

  const leftFunction = () => {
    setCurrentPage((prev: number) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const rightFunction = () => {
    setCurrentPage((prev: number) =>
      prev >= images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={classes.container}>
      {messages === "Loading" && <div>Loading...</div>}
      {messages === "Error" && <div>Found Some Error</div>}

      {images.length > 0 && (
        <BsArrowLeftCircleFill
          onClick={leftFunction}
          className={`${classes.arrow} ${classes["arrow-left"]}`}
        />
      )}

      {images.length > 0 &&
        images.map((url: Url, _idx: number) => (
          <img
            className={`${classes.images} ${
              currentPage === _idx
                ? classes["current-image"]
                : classes["hide-current-image"]
            }`}
            src={url.download_url}
            key={url.id}
            alt={url.download_url}
          ></img>
        ))}

      {images.length > 0 && (
        <BsArrowRightCircleFill
          onClick={rightFunction}
          className={`${classes.arrow} ${classes["arrow-right"]}`}
        />
      )}
      <span className={classes.circle}>
        {images.map((_, _idx: number) => (
          <button
            key={_idx}
            className={`${classes["circle-indica"]} ${
              classes[_idx === currentPage ? "cirlce-active" : ""]
            }`}
            onClick={()=>{setCurrentPage(_idx)}}
          ></button>
        ))}
      </span>
    </div>
  );
}

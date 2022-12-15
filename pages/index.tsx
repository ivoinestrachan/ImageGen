import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import fs from "fs-extra";
import React, { useState } from "react";
import sharp from "sharp";

const generateImageFromWord = async (word: string): Promise<Buffer> => {
  try {
    const image = await sharp(await fs.readFile("./existing-image.png"));

    const compositeImage = image.composite([
      {
        input: await sharp(Buffer.from(word)).toBuffer(),
        gravity: "southeast",
      },
    ]);

    return compositeImage.toBuffer();
  } catch (error) {
    throw new Error(
      "The existing-image.png file does not exist or could not be read"
    );
  }
};

const Home: NextPage = () => {
  const [word, setWord] = useState("");
  const [image, setImage] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const img = await generateImageFromWord(word);
      setImage(img.toString());
    } catch (error) {
      throw new Error(
        "An error occurred while generating the image. Please try again."
      );
    }
  };

  return (
    <div>
      <Head>
        <title>ImageGen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="text-center">
          <input
            type="text"
            value={word}
            onChange={handleChange}
            className="border outline-none rounded-sm w-[450px]"
          />
        </div>
        <div className="text-center mt-5">
          <button
            type="submit"
            className="bg-green-400 p-2 rounded-md text-white font-mono items-center"
          >
            Generate Image
          </button>
        </div>
      </form>
      <div className="text-center">
      <Image src={image} alt="generated image" className="ml-auto mr-auto" />
      </div>
    </div>
  );
};

export default Home;

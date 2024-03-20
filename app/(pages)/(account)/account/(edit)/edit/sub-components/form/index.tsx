"use client";
const profileDefault =
  "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, useContext, useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { MdOutlinePhotoCameraBack } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputUi } from "@/components/ui/inputs/default";
import { UpdateUserApi } from "@/services/user/update";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateUi } from "@/components/ui/inputs/date";
import { ContextUser } from "@/contexts/ContextUser";
import { storage } from "@/services/firebase/index";
import { InputsEdit, schema } from "./types";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { formatCpf } from "@/masks/cpf";
import Image from "next/image";

function FormEdit() {
  const [imgUrl, setImgUrl] = useState<string>(profileDefault);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [cpf, setCpf] = useState<string>("");
  const router = useRouter();
  const context = useContext(ContextUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsEdit>({
    resolver: yupResolver(schema),
  });
  
  console.log("teste");
  
  const onSubmit: SubmitHandler<InputsEdit> = async (data) => {
    if (!context) {
      return;
    }
    const { user } = context;
    console.log("Submit foi acionado");
    console.log(data);
  };
  const toggleProfile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCPF: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const formattedValue = formatCpf(value);
    setCpf(formattedValue);
  };

  if (!context) {
    return;
  }
  const { user } = context;
  console.log(user);
  

  return (
    <form
      className="z-10 flex items-center justify-center w-full flex-col px-20 max-sm:px-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative mt-8">
        <Image
          alt="profile logo"
          src={
            selectedImage ||
            "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg"
          }
          className="max-h-[115px] max-w-[115px] border-[6px] shadow-snipped border-solid border-custom-grayOne  rounded-full object-cover"
          width={115}
          height={115}
        />

        <label
          htmlFor="fileInput"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-49%] cursor-pointer "
        >
          <input
            {...register("file")}
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={toggleProfile}
            className="sr-only"
            disabled={loading ? true : false}
          />
          <div className="w-[108px] h-[108px] rounded-full flex items-center justify-center border-custom-grayOne bg-custom-grayOne/60 border-[2px] duration-300 ease-linear hover:bg-custom-grayTwo/90">
            <MdOutlinePhotoCameraBack className="text-5xl text-custom-textColor/60" />
          </div>
        </label>
      </div>
      <div className="mt-5 w-full flex flex-col items-start">
        <InputUi
          type="text"
          label="Username"
          pleaceholder="neydelas011"
          classname="w-full text-custom-textColor"
          name="username"
          register={register}
          error={errors?.username?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.username}
        />
        <InputUi
          type="text"
          label="Fullname"
          pleaceholder="Neymar Santos Junior"
          classname="w-full text-custom-textColor"
          name="fullname"
          register={register}
          error={errors?.fullname?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.fullname}
        />
        <InputUi
          type="email"
          label="Email"
          pleaceholder="neymar.arabia@gmail.com"
          classname="w-full text-custom-textColor"
          name="email"
          register={register}
          error={errors?.email?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.email}
        />
        <InputUi
          type="text"
          label="CPF"
          pleaceholder="xxx.xxx.xxx-xx"
          classname="w-full text-custom-textColor"
          name="cpf"
          value={cpf}
          change={handleCPF}
          register={register}
          error={errors?.cpf?.message}
          disabled={loading ? true : false}
          defaultvalue={user?.cpf}
        />
        <div className="flex justify-between w-full gap-9 max-sm:flex-wrap max-sm:gap-0">
          <div className="w-1/2 flex gap-[1px] flex-col max-sm:w-full">
            <InputUi
              type="date"
              label="Date of birth"
              pleaceholder=""
              classname="w-full text-custom-textColor inputDate"
              name="birthdate"
              register={register}
              error={errors?.birthdate?.message}
              disabled={loading ? true : false}
              defaultvalue={user?.date_of_birth}
            />
          </div>
          <div className="w-1/2 flex gap-[1px] flex-col max-sm:w-full">
            <InputUi
              type="text"
              label="Phone"
              pleaceholder="11 99999-9999"
              classname="w-full text-custom-textColor"
              name="phone"
              register={register}
              error={errors?.phone?.message}
              disabled={loading ? true : false}
              defaultvalue={user?.phone}
            />
          </div>
        </div>
        <div>
          <label className={` mb-8 text-sm text-custom-textColor uppercase`}>
            Gender
          </label>
          <RadioGroup>
            <Stack
              spacing={5}
              direction="row"
              color={"#fff"}
              fontSize={"6px"}
              marginTop={"4px"}
              {...register("gender")}
            >
              <Radio value="Feminine">Feminine</Radio>
              <Radio value="Masculine">Masculine</Radio>
              <Radio value="Other">Other</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div className="flex justify-end w-full gap-4 text-custom-textColor font-semibold mt-6 pb-6">
        <button
          type="button"
          className="py-2 px-6 border-2 border-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
          onClick={() => router.back()}
          disabled={loading ? true : false}
        >
          Cancel
        </button>
        {loading ? (
          <span className="py-2 px-6 bg-custom-pink rounded-md">
            <ImSpinner9 className="animate-spin text-3xl" />
          </span>
        ) : (
          <button
            type="submit"
            className="py-2 px-6 bg-custom-pink/40 rounded-md hover:bg-custom-pink duration-300 ease-linear"
          >
            Save
          </button>
        )}
      </div>
    </form>
  );
}

export { FormEdit };
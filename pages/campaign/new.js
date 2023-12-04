import React, { useState } from "react";
import Head from "next/head";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { useAsync } from "react-use";
import { useRouter } from "next/router";
import { useWallet } from "use-wallet";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightAddon,
  InputGroup,
  Alert,
  AlertIcon,
  AlertDescription,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getETHPrice, getETHPriceInUSD } from "../../lib/getETHPrice";

import factory from "../../smart-contract/factory";
import web3 from "../../smart-contract/web3";
const projectId = "2WU8FdtJy1MOIaSmUOReJweAdm7";
const projectSecretKey = "834da979956df31124cfe3758333a6b4";
const authorization = "Basic " + btoa(projectId + ":" + projectSecretKey);

export default function NewCampaign() {
//ipfs


  const [buf, setBuf] = useState();
  const [hash, setHash] = useState("");
  const [loader, setLoader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const [images, setImages] = useState([])
  const ipfs = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization,
    },
  });
  const onSubmitHandler = async () => {
    const input = document.getElementById("file");
    console.log(">>>>>>>",input)
  
    if (!input.files || input.files.length === 0) {
      return alert("No files selected");
    }
  
    const file = input.files[0];
    setLoader(true);
  
    try {
      const result = await ipfs.add(file);
      const ipfsId = result.path;
      console.log("Generated IPFS Hash:", ipfsId);
      const val = ("https://ipfs.io/ipfs/"+ipfsId);
      console.log("Value",val);
      setLink(val);
      setHash(ipfsId);
      setShowLinks(true);
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check the console");
    } finally {
      setLoader(false);
    }
  };











  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const wallet = useWallet();
  const [minContriInUSD, setMinContriInUSD] = useState();
  const [targetInUSD, setTargetInUSD] = useState();
  const [ETHPrice, setETHPrice] = useState(0);
  const [Link, setLink] = useState("");
  useAsync(async () => {
    try {
      const result = await getETHPrice();
      setETHPrice(result);
    } catch (error) {
      console.log(error);
    }
  }, []);
  async function onSubmit(data) {
    console.log(
      data.minimumContribution,
      data.campaignName,
      data.description,
      data.imageUrl,
      data.target,
      data.milestones
    );
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          web3.utils.toWei(data.minimumContribution, "ether"),
          data.campaignName,
          data.description,
          data.imageUrl,
          web3.utils.toWei(data.target, "ether")
        )
        .send({
          from: accounts[0],
        });

        const miles = data.milestones
        const namecamp = data.campaignName

      // router.push("/");

      router.push({
        pathname: '/', // Specify the path of your next page
        query: { 
          miles,
          namecamp,
        },
      });
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

  return (
    <div>
      <Head>
        <title>New Campaign</title>
        <meta name="description" content="Create New Campaign" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Text fontSize={"lg"} color={"teal.400"}>
            <ArrowBackIcon mr={2} />
            <NextLink href="/"> Back to Home</NextLink>
          </Text>
          <Stack>
            <Heading fontSize={"4xl"}>Create a New Campaign 📢</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="minimumContribution">
                  <FormLabel>Minimum Contribution Amount</FormLabel>
                  <InputGroup>
                    {" "}
                    <Input
                      type="number"
                      step="any"
                      {...register("minimumContribution", { required: true })}
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setMinContriInUSD(Math.abs(e.target.value));
                      }}
                    />{" "}
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {minContriInUSD ? (
                    <FormHelperText>
                      ~$ {getETHPriceInUSD(ETHPrice, minContriInUSD)}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl id="campaignName">
                  <FormLabel>Campaign Name</FormLabel>
                  <Input
                    {...register("campaignName", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormControl id="description">
                  <FormLabel>Campaign Description</FormLabel>
                  <Textarea
                    {...register("description", { required: true })}
                    isDisabled={isSubmitting}
                  />
                </FormControl>
                <FormControl id="imageUrl">
                  <FormLabel>Image URL</FormLabel>
                  <Input
                    {...register("imageUrl", { required: true })}
                    isDisabled={isSubmitting}
                    type="url"
                    value = {Link}
                  />
                </FormControl>
                <FormControl id="target">
                  <FormLabel>Target Amount</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("target", { required: true })}
                      isDisabled={isSubmitting}
                      onChange={(e) => {
                        setTargetInUSD(Math.abs(e.target.value));
                      }}
                    />
                    <InputRightAddon children="ETH" />
                  </InputGroup>
                  {targetInUSD ? (
                    <FormHelperText>
                      ~$ {getETHPriceInUSD(ETHPrice, targetInUSD)}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl id="milestones">
                  <FormLabel>Milestones</FormLabel>
                  <InputGroup>
                    <Input
                      type="number"
                      step="any"
                      {...register("milestones", { required: true })}
                      isDisabled={isSubmitting}
                      // onChange={(e) => {
                      //   setTargetInUSD(Math.abs(e.target.value));
                      // }}
                    />
                    <InputRightAddon children="Milestones" />
                  </InputGroup>
                </FormControl>
                

                <div>
  {ipfs && (
   <>
   <h3>Upload Property Docs to IPFS</h3>
   <input type="file" name="file" id="file" />
   <button type="button" onClick={onSubmitHandler}>
     Upload file
   </button>
 </>
  )}
  {/* {showLinks ? (
    <div>
      <h6>https://ipfs.io/ipfs/{hash}</h6>
      <a href={"https://ipfs.io/ipfs/" + hash}>Clickable Link to view file on IPFS</a>
    </div>
  ) : (
    <p></p>
  )} */}
</div>




                {error ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}> {error}</AlertDescription>
                  </Alert>
                ) : null}
                {errors.minimumContribution ||
                errors.name ||
                errors.description ||
                errors.imageUrl ||
                errors.target ? (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription mr={2}>
                      {" "}
                      All Fields are Required
                    </AlertDescription>
                  </Alert>
                ) : null}
                <Stack spacing={10}>
                  {wallet.status === "connected" ? (
                    <Button
                      bg={"teal.400"}
                      color={"white"}
                      _hover={{
                        bg: "teal.500",
                      }}
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Create
                    </Button>
                  ) : (
                    <Stack spacing={3}>
                      <Button
                        color={"white"}
                        bg={"teal.400"}
                        _hover={{
                          bg: "teal.300",
                        }}
                        onClick={() => wallet.connect()}
                      >
                        Connect Wallet{" "}
                      </Button>
                      <Alert status="warning">
                        <AlertIcon />
                        <AlertDescription mr={2}>
                          Please Connect Your Wallet First to Create a Campaign
                        </AlertDescription>
                      </Alert>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </main>
    </div>
  );
}

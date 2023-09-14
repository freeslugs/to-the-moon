import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import useThemeColors from "../../styles/useThemeColors";

interface IGmCardProps {
  children: ReactNode;
}

function GmCard({ children }: IGmCardProps) {
  const { borderColor, cardBgColor } = useThemeColors();

  return (
    <Flex
      flexDir={"column"}
      borderRadius={"24px"}
      bgColor={cardBgColor}
      alignItems={"center"}
      border={`solid 1px ${borderColor}`}
    >
      {children}
    </Flex>
  );
}

export default GmCard;

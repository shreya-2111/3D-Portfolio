import type { IconType } from "react-icons";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPlay } from "react-icons/fi";
import { SiBlender } from "react-icons/si";
import {
  TbBrush,
  TbCube3dSphere,
  TbSparkles,
  TbVectorBezier2,
} from "react-icons/tb";
import type { SkillIconName, SocialName } from "@/data/portfolio";

export const skillIcons: Record<SkillIconName, IconType> = {
  "after-effects": TbSparkles,
  blender: SiBlender,
  "cinema-4d": TbCube3dSphere,
  "premiere-pro": FiPlay,
  photoshop: TbBrush,
  illustrator: TbVectorBezier2,
};

export const socialIcons: Record<SocialName, IconType> = {
  Instagram: FaInstagram,
  LinkedIn: FaLinkedinIn,
};

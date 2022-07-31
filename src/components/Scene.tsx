import { useContext } from "react";
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import Asset from "./Asset";
import Button from "./Button";
import context from "./context";
import Input from "./Input";
import Label from "./Label";
import SectionDivider from "./SectionDivider";

export interface ISceneProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<any>;
  messageToApp: (message: string, data?: any) => void;
}

export default function Scene(props: ISceneProps) {
  const { register, setValue, messageToApp } = props;
  const { state } = useContext(context);
  const { document } = state;
  const { values } = document;

  if (!document?.values) return null;

  const handleSetScene = () => {
    console.log("system setting scene", document);
    messageToApp("setScene", {
      sceneId: document._id,
    });
  };

  return (
    <div className="space-y-2">
      <Button onClick={handleSetScene}>Set Scene</Button>

      <br />

      <SectionDivider className="mt-4">Information</SectionDivider>

      <div className="flex space-x-2">
        <Label className="w-32 self-center" htmlFor="name">
          Name
        </Label>
        <Input
          placeholder="Name..."
          defaultValue={values.name}
          {...register("name")}
        />
      </div>

      <div className="flex space-x-2">
        <Label className="w-32 self-center" htmlFor="name">
          Subtitle
        </Label>
        <Input
          placeholder="Subtitle..."
          defaultValue={values.subtitle}
          {...register("subtitle")}
        />
      </div>

      <div className="flex justify-start space-x-2">
        <Label className="w-32 self-center" htmlFor="name">
          Secret
        </Label>
        <Input
          type="checkbox"
          defaultChecked={values.nameIsSecret}
          {...register("nameIsSecret")}
        />
      </div>

      <SectionDivider className="mt-4">Media</SectionDivider>

      <div className="flex space-x-2">
        <Label className="w-32 self-center" htmlFor="mapId">
          Show
        </Label>
        <div>
          <label htmlFor="coverRadio">Show Cover</label>
          <input
            type="radio"
            id="coverRadio"
            value="false"
            defaultChecked={!values.showMap}
            {...register("showMap")}
          />

          <label htmlFor="mapRadio">Show Map</label>
          <input
            type="radio"
            id="mapRadio"
            value="true"
            defaultChecked={values.showMap}
            {...register("showMap")}
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <div className="flex flex-1 flex-col space-y-2">
          <Label className="mt-2 w-32" htmlFor="mapId">
            Map
          </Label>
          <Asset
            name="mapId"
            setValue={setValue}
            messageToParent={messageToApp}
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="flex flex-1 flex-col space-y-2">
          <Label className="mt-2 w-32" htmlFor="coverId">
            Cover
          </Label>
          <Asset
            name="coverId"
            setValue={setValue}
            messageToParent={messageToApp}
            style={{ maxWidth: "200px" }}
          />
        </div>
      </div>

      <SectionDivider className="mt-4">Grid</SectionDivider>

      <div className="flex space-x-2">
        <div className="flex-1">
          <Label className="w-32 self-center" htmlFor="grid.size">
            Size
          </Label>
          <Input type="number" {...register("grid.size")} placeholder="10..." />
        </div>

        <div className="flex-1">
          <Label className="w-32 self-center" htmlFor="grid.x">
            X
          </Label>
          <Input type="number" {...register("grid.x")} placeholder="0..." />
        </div>

        <div className="flex-1">
          <Label className="w-32 self-center" htmlFor="grid.y">
            Y
          </Label>
          <Input type="number" {...register("grid.y")} placeholder="0..." />
        </div>

        <div className="flex-1">
          <Label className="w-32 self-center" htmlFor="grid.color">
            Color
          </Label>
          <div
            className="rounded-lg"
            style={{ background: values.grid ? values.grid["color"] : "white" }}
          >
            <Input
              type="color"
              {...register("grid.color")}
              className="h-9 w-full p-0 opacity-0"
            />
          </div>
        </div>

        <div className="flex-1">
          <Label className="w-32 self-center" htmlFor="grid.alpha">
            Alpha
          </Label>
          <Input type="number" {...register("grid.alpha")} placeholder="1..." />
        </div>
      </div>
    </div>
  );
}

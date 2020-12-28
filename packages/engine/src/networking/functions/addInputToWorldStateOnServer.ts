import { Entity } from '../../ecs/classes/Entity';
import { Behavior } from '../../common/interfaces/Behavior';
import { Input } from '../../input/components/Input';
import { getComponent } from '../../ecs/functions/EntityFunctions';
import { NetworkObject } from '../components/NetworkObject';
import { InputType } from '../../input/enums/InputType';
import { Network } from '../components/Network';
import { LifecycleValue } from '../../common/enums/LifecycleValue';
import _ from 'lodash';
import { NetworkInputInterface } from "../interfaces/WorldState";
import { CharacterComponent } from "../../templates/character/components/CharacterComponent";

export const addInputToWorldStateOnServer: Behavior = (entity: Entity) => {
  const input = getComponent(entity, Input);
  const networkId = getComponent(entity, NetworkObject).networkId;
  // If there's no input, don't send the frame, unless the last frame had input
  if (input.data.size < 1 && _.isEqual(input.data, input.lastData))
    return;

  const actor = getComponent(entity, CharacterComponent);

  // Create a schema for input to send
  const inputs:NetworkInputInterface = {
    networkId: networkId,
    buttons: [],
    axes1d: [],
    axes2d: [],
    viewVector: {
      x: actor.viewVector.x,
      y: actor.viewVector.y,
      z: actor.viewVector.z
    }
  };

  let numInputs;

  // Add all values in input component to schema
  input.data.forEach((value, key) => {
    switch (value.type) {
      case InputType.BUTTON:
        inputs.buttons.push({ input: key, value: value.value, lifecycleState: value.lifecycleState });
        numInputs++;
        break;
      case InputType.ONEDIM:
        if (value.lifecycleState !== LifecycleValue.UNCHANGED) {
          inputs.axes1d.push({ input: key, value: value.value, lifecycleState: value.lifecycleState });
          numInputs++;
        }
        break;
      case InputType.TWODIM:
        if (value.lifecycleState !== LifecycleValue.UNCHANGED) {
          inputs.axes2d.push({ input: key, value: value.value, lifecycleState: value.lifecycleState });
          numInputs++;
        }
        break;
      default:
        console.error("Input type has no network handler (maybe we should add one?)");
    }
  });

  // Add inputs to world state
  Network.instance.worldState.inputs.push(inputs);
};
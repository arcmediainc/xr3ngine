import { Component } from '../../ecs/classes/Component';
import { Types } from '../../ecs/types/Types';

export class WebXRSpace extends Component<any> {
  static _schema = {
    space: { type: Types.Ref },
    spaceType: { type: Types.String }
  }
}
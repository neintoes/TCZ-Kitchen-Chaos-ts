// GH1
interface iChoppingBoard{
    isChoppingBoard: boolean;
}

abstract class WorkStation extends BaseSprite {
    constructor(image: Image) {
        super(image, SpriteKind.WorkStation)
    }

    public interact(sprite: Sprite): void {
        if (sprite.data.isChoppable) {
            sprite.data.alterIngredient();
        }
    }
}

class ChoppingBoard extends WorkStation implements iChoppingBoard{
    isChoppingBoard = true;
    
    constructor() {
        super(assets.image`chopping board`);
    }
}
// end GH1
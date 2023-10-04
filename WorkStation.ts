// GH1
enum WorkStationType {
    ChoppingBoard = 0
}

abstract class WorkStation extends BaseSprite {
    type: WorkStationType;
    private applicableIngredientTypes: IngredientType[];

    constructor(image: Image, type: WorkStationType, applicableIngredientTypes: IngredientType[]) {
        super(image, SpriteKind.WorkStation)
        this.type = type;
        this.applicableIngredientTypes = applicableIngredientTypes;
    }

    public interact(sprite: Sprite): void {
        this.applicableIngredientTypes.forEach(function(type: IngredientType): void {
            if (sprite.data.type == type) {
                sprite.data.alterIngredient();
            }
        });
    }
}

class ChoppingBoard extends WorkStation {

    constructor() {
        let applicableIngredientTypes = [IngredientType.Tomato, IngredientType.Lettuce]
        super(assets.image`chopping board`, WorkStationType.ChoppingBoard, applicableIngredientTypes);
    }
}
// end GH1
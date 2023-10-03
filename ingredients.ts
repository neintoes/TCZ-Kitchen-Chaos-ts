enum IngredientType {
    Bread = 0,
    Lettuce,
    Meat,
    Tomato
}

abstract class Ingredient extends BaseSprite {
    constructor(image: Image) {
        super(image, SpriteKind.Ingredient);
        this.sprite.scale = 0.75;
        this.sprite.setFlag(SpriteFlag.AutoDestroy, true);
    }
}

class IngredientSpawner extends BaseSprite {
    type: IngredientType;
    constructor(type: IngredientType, location: tiles.Location) {
        super(helperFunctions.ingredientImageFromType(type), SpriteKind.Icon);
        this.type = type;
        tiles.placeOnTile(this.sprite, location);
    }

    public spawnIngredient(): Ingredient {
        switch(this.type) {
            case IngredientType.Bread:
                return new Bread();
            case IngredientType.Lettuce:
                return new Lettuce();
            case IngredientType.Meat:
                return new Meat();
            case IngredientType.Tomato:
                return new Tomato();
            default:
                throw "Not a valid type"
        }
    }
}

class Bread extends Ingredient {
    type: IngredientType = IngredientType.Bread
    constructor() {
        super(assets.image`bread`);
    }
}

class Lettuce extends Ingredient {
    type: IngredientType = IngredientType.Lettuce
    constructor() {
        super(assets.image`lettuce`);
    }
}

class Meat extends Ingredient {
    type: IngredientType = IngredientType.Meat
    constructor() {
        super(assets.image`meat`);
    }
}

class Tomato extends Ingredient {
    type: IngredientType = IngredientType.Tomato
    constructor() {
        super(assets.image`tomato`);
    }
}
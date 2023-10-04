// GH1
enum IngredientType {
    Bread = 0,
    Lettuce,
    ChoppedLettuce,
    Meat,
    Tomato,
    ChoppedTomato
}

interface iChoppable{
    isChoppable: boolean;
}
// end GH1


abstract class Ingredient extends BaseSprite {
    type: IngredientType;
    constructor(image: Image, type: IngredientType) {
        super(image, SpriteKind.Ingredient);
        this.type = type;
        this.sprite.scale = 0.75;
        this.sprite.setFlag(SpriteFlag.AutoDestroy, true);
    }
}

// GH1
abstract class ModifiableIngredient extends Ingredient {
    altered: boolean = false;
    alteredImage: Image;
    alteredType: IngredientType;
    constructor(image: Image, alteredImage: Image, type: IngredientType, alteredType: IngredientType) {
        super(image, type);
        this.alteredImage = alteredImage;
        this.alteredType = alteredType;
    }

    public alterIngredient(): void {
        if (!this.altered) {
            this.altered = true;
            this.sprite.setImage(this.alteredImage);
            this.type = this.alteredType;
        }
    }
}

// end GH1

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
    constructor() {
    super(assets.image`bread`, IngredientType.Bread);
    }
}

// GH1
class Lettuce extends ModifiableIngredient implements iChoppable {
    isChoppable: boolean = true;
    constructor() {
        super(assets.image`lettuce`, assets.image`chopped lettuce`, IngredientType.Lettuce, IngredientType.ChoppedLettuce);
    }
}
// end GH1

class Meat extends Ingredient {
    constructor() {
        super(assets.image`meat`, IngredientType.Meat);
    }
}

// GH1
class Tomato extends ModifiableIngredient implements iChoppable{
    isChoppable: boolean = true;
    constructor() {
        super(assets.image`tomato`, assets.image`chopped tomato`, IngredientType.Tomato, IngredientType.ChoppedTomato);
    }
}
// end GH1
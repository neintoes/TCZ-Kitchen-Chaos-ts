class Order {
    private recipe: IngredientType[] = [];
    private recipeIcons: Sprite[] = [];
    public plate: Sprite;
    public cooked: boolean = false;

    constructor() {
        this.initialiseRecipe();
        this.initialisePlate();
        this.displayOrder();
    }

    private initialiseRecipe(): void {
        this.recipe = [IngredientType.Bread, IngredientType.Meat];
        if (randint(1, 2) == 1) {
            if(randint(1, 2) == 1) {
                this.recipe.push(IngredientType.Lettuce);
            } else {
                this.recipe.push(IngredientType.ChoppedLettuce);
            }
        } else {
            if (randint(1, 2) == 1) {
                this.recipe.push(IngredientType.Tomato);
            } else {
                this.recipe.push(IngredientType.ChoppedTomato);
            }
        }
    }

    private initialisePlate(): void {
        this.plate = sprites.create(assets.image`plate`, SpriteKind.Plate);
        this.plate.scale = 1 / 3;
        tiles.placeOnRandomTile(this.plate, assets.tile`counter`);
        this.plate.setFlag(SpriteFlag.AutoDestroy, true);
    }

    private displayOrder(): void {
        this.recipeIcons = [];
        for (let i: number = 0; i < this.recipe.length; i++) {
            let ingredient = this.recipe[i];
            let ingredientIcon = helperFunctions.ingredientSpriteFromType(ingredient);
            ingredientIcon.setPosition((i * 16) + 16, 8);
            this.recipeIcons.push(ingredientIcon);
        }
    }

    public checkIngredients(type: IngredientType): boolean {
        for (let i: number = 0; i < this.recipe.length; i++) {
            if (this.recipe[i] == type) {
                this.recipe.removeAt(i);
                if (this.recipe.length < 1) {
                    this.finishRecipe();
                }
                sprites.allOfKind(SpriteKind.UI).forEach(function(icon: Sprite): void {
                    icon.destroy();
                });
                this.displayOrder();
                return true;
            }
        }
        return false;
    }

    public finishRecipe():void {
        this.plate.setImage(assets.image`meal`);
        this.plate.y -= 4;
        this.cooked = true;
    }
}

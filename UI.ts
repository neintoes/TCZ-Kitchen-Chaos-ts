// class IngredientDisplay {
//     ingredientSprites: Sprite[] = [];

//     constructor() {
//         this.updateDisplay();
//     }

//     updateDisplay(recipe: IngredientType): void {
//         this.ingredientSprites.forEach(sprite => sprite.destroy());
//         this.ingredientSprites = [];
//         for (let i = 0; i < recipe.items.length; i++) {
//             const ingredientType = recipe.items[i];
//             const ingredientSprite = sprites.create(
//                 assets.image(IngredientType[ingredientType]),
//                 SpriteKind.recipe_items
//             );
//             ingredientSprite.set_position((i * 16) + 16, 16);
//             this.ingredientSprites.push(ingredientSprite);
//         }
//     }
// }

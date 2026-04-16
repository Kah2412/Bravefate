import { describe, it, expect } from "vitest";
import { women } from "@/data/women";
import { supportResources, importantContacts, strengthenContents } from "@/data/support-resources";

describe("Brave - Data Integrity", () => {
  it("deve ter mulheres carregadas", () => {
    expect(women.length).toBeGreaterThan(0);
    expect(women[0]).toHaveProperty("name");
    expect(women[0]).toHaveProperty("profession");
  });

  it("deve ter recursos de apoio", () => {
    expect(supportResources.length).toBeGreaterThan(0);
    expect(supportResources[0]).toHaveProperty("title");
    expect(supportResources[0]).toHaveProperty("content");
  });

  it("deve ter contatos de emergência", () => {
    expect(importantContacts.length).toBeGreaterThan(0);
    expect(importantContacts[0]).toHaveProperty("number");
    expect(importantContacts[0]).toHaveProperty("name");
  });

  it("deve ter conteúdo de fortalecimento", () => {
    expect(strengthenContents.length).toBeGreaterThan(0);
    expect(strengthenContents[0]).toHaveProperty("title");
    expect(strengthenContents[0]).toHaveProperty("affirmations");
  });
});

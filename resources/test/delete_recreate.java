package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;

public class DeleteRecreate {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    baseUrl = "https://localhost/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void testDeleteRecreate() throws Exception {
    driver.get(baseUrl + "/app");
    driver.findElement(By.id("set-tab-5")).click();
    driver.findElement(By.linkText("Close account")).click();
    driver.findElement(By.id("yes-delete")).click();
    driver.findElement(By.cssSelector("button.pure-button.pure-button-primary")).click();
    driver.findElement(By.id("signupUsername")).clear();
    driver.findElement(By.id("signupUsername")).sendKeys("alyssamvance@gmail.com");
    driver.findElement(By.id("signupPassword")).clear();
    driver.findElement(By.id("signupPassword")).sendKeys("dummy271");
    driver.findElement(By.id("signupConfirm")).clear();
    driver.findElement(By.id("signupConfirm")).sendKeys("dummy271");
    driver.findElement(By.cssSelector("input.pure-button.pure-button-primary")).click();
    driver.findElement(By.cssSelector("a.pure-button.pure-button-primary > h3")).click();
    driver.findElement(By.id("submit_approve_access")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
